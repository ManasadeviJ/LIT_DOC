const { CosmosClient } = require("@azure/cosmos");
const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    context.log('🔵 Starting newsletter subscription process');

    try {
        // Get email from request body
        const email = req.body.email;
        context.log('📨 Email received from request body:', email);

        if (!email) {
            context.log('❌ No email provided in the request');
            context.res = {
                status: 400,
                body: { error: "Email is required" }
            };
            return;
        }

        // Initialize Cosmos DB client
        const cosmosEndpoint = process.env.COSMOS_DB_ENDPOINT;
        const cosmosKey = process.env.COSMOS_DB_KEY;
        context.log('🔧 Cosmos DB endpoint:', cosmosEndpoint ? '✔️ Found' : '❌ Missing');
        context.log('🔧 Cosmos DB key:', cosmosKey ? '✔️ Found' : '❌ Missing');

        const cosmosClient = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
        const database = cosmosClient.database("luxuryintaste");
        const container = database.container("subscribers");
        context.log('✅ Connected to Cosmos DB');

        // Check if email already exists
        context.log(`🔍 Checking if email ${email} already exists in DB`);
        const { resources: existingSubscribers } = await container.items
            .query(`SELECT * FROM c WHERE c.email = "${email}"`)
            .fetchAll();

        if (existingSubscribers.length > 0) {
            context.log('⚠️ Email already exists in subscribers list');
            context.res = {
                status: 400,
                body: { error: "Email already subscribed" }
            };
            return;
        }

        // Add new subscriber to Cosmos DB
        const subscriber = {
            id: email,
            email: email,
            subscriptionDate: new Date().toISOString(),
            status: "pending"
        };

        await container.items.create(subscriber);
        context.log('✅ New subscriber saved in Cosmos DB');

        // Initialize Azure Communication Services Email client
        const connectionString = process.env.ACS_CONNECTION_STRING;
        const senderEmail = process.env.EMAIL_SENDER_ADDRESS;
        const confirmationUrl = process.env.CONFIRMATION_URL;

        context.log('🔧 Email connection string:', connectionString ? '✔️ Found' : '❌ Missing');
        context.log('📤 Sender address:', senderEmail || '❌ Not found');
        context.log('🔗 Confirmation URL:', confirmationUrl || '❌ Not found');

        const emailClient = new EmailClient(connectionString);

        // Send confirmation email
        const emailMessage = {
            senderAddress: senderEmail,
            content: {
                subject: "Confirm your newsletter subscription",
                plainText: `Thank you for subscribing to our newsletter! Please click the following link to confirm your subscription: ${confirmationUrl}?email=${email}`
            },
            recipients: {
                to: [{ address: email }]
            }
        };

        context.log('📨 Sending confirmation email...');
        const poller = await emailClient.beginSend(emailMessage);
        const result = await poller.pollUntilDone();

        context.log('✅ Confirmation email sent');

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: { message: "Subscription successful! Please check your email to confirm." }
        };
    } catch (error) {
        context.log.error('❗️ Error during subscription process:', error);
        context.res = {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: { message: "An error occurred while processing your subscription" }
        };
    }
};

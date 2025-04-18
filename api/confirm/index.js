const { CosmosClient } = require("@azure/cosmos");
const { EmailClient } = require("@azure/communication-email");

module.exports = async function (context, req) {
    context.log('Processing email confirmation request');

    try {
        // Get email from query parameters
        const email = req.query.email;
        if (!email) {
            context.res = {
                status: 400,
                body: { error: "Email is required" }
            };
            return;
        }

        // Initialize Cosmos DB client
        const cosmosEndpoint = process.env.COSMOS_DB_ENDPOINT;
        const cosmosKey = process.env.COSMOS_DB_KEY;
        const cosmosClient = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
        const database = cosmosClient.database("luxuryintaste");
        const container = database.container("subscribers");

        // Find the subscriber
        const { resources: subscribers } = await container.items
            .query(`SELECT * FROM c WHERE c.email = "${email}"`)
            .fetchAll();

        if (subscribers.length === 0) {
            context.res = {
                status: 404,
                body: { error: "Subscriber not found" }
            };
            return;
        }

        const subscriber = subscribers[0];

        // Update subscriber status to confirmed
        subscriber.status = "confirmed";
        await container.item(subscriber.id).replace(subscriber);

        // Send welcome email
        const connectionString = process.env.ACS_CONNECTION_STRING;
        const emailClient = new EmailClient(connectionString);

        const emailMessage = {
            senderAddress: process.env.EMAIL_SENDER_ADDRESS,
            content: {
                subject: "Welcome to our newsletter!",
                plainText: "Thank you for confirming your subscription to our newsletter. You will now receive our weekly updates on luxury, sustainable, fast fashion and the sneaker market."
            },
            recipients: {
                to: [{ address: email }]
            }
        };

        const poller = await emailClient.beginSend(emailMessage);
        const result = await poller.pollUntilDone();

        context.res = {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                message: "Email confirmed successfully!"
            }
        };
        

    } catch (error) {
        context.log.error('Error processing confirmation:', error);
        context.res = {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                error: "An error occurred while processing your confirmation"
            }
        };
    }
    
}; 
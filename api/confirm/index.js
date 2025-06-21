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

        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #1a1a1a; color: #ffffff;">
                <!-- LIT Logo -->
                <div style="text-align: center; margin-bottom: 30px;">
                    <img src="https://luxuryintaste.blob.core.windows.net/images/lit-logo-white.png" alt="LIT Logo" style="width: 100px; height: auto;">
                </div>

                <!-- Welcome Text -->
                <h1 style="color: #9333EA; text-align: center; font-size: 28px; margin-bottom: 20px;">
                    Welcome to LIT - Your Weekly Fashion Fix!
                </h1>

                <!-- Subtitle -->
                <h2 style="color: #ffffff; text-align: center; font-size: 24px; margin-bottom: 30px;">
                    Stay Ahead of Fashion Trends with LIT!
                </h2>

                <!-- Main Content -->
                <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: left;">
                    You're officially part of LIT's fashion-forward community! Get ready for weekly updates on 
                    Fast Fashion, Luxury Fashion, Sustainable Fashion, and the Sneaker Market to keep you informed.
                </p>

                <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; margin-bottom: 20px; text-align: left;">
                    We promise zero fluff, just pure fashion insights to keep you ahead of the curve.
                </p>

                <p style="color: #a0a0a0; font-size: 16px; line-height: 1.6; margin-bottom: 30px; text-align: left;">
                    Stay tuned for our first edition!
                </p>

                <!-- Team Signature -->
                <p style="color: #9333EA; text-align: center; font-size: 18px; margin-bottom: 20px;">
                    LIT Team
                </p>

                <!-- Social Media Section -->
                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #9333EA; font-size: 18px; margin-bottom: 20px;">
                        Follow Us on Socials
                    </p>
                    <div style="display: inline-block;">
                        <a href="https://linkedin.com/company/luxuryintaste" style="text-decoration: none; margin: 0 10px;">
                            <img src="https://luxuryintaste.blob.core.windows.net/images/linkedin.png" alt="LinkedIn" style="width: 40px; height: 40px;">
                        </a>
                        <a href="https://instagram.com/luxuryintaste" style="text-decoration: none; margin: 0 10px;">
                            <img src="https://luxuryintaste.blob.core.windows.net/images/instagram.png" alt="Instagram" style="width: 40px; height: 40px;">
                        </a>
                        <a href="https://facebook.com/luxuryintaste" style="text-decoration: none; margin: 0 10px;">
                            <img src="https://luxuryintaste.blob.core.windows.net/images/facebook.png" alt="Facebook" style="width: 40px; height: 40px;">
                        </a>
                        <a href="https://twitter.com/luxuryintaste" style="text-decoration: none; margin: 0 10px;">
                            <img src="https://luxuryintaste.blob.core.windows.net/images/twitter.png" alt="Twitter" style="width: 40px; height: 40px;">
                        </a>
                    </div>
                </div>
            </div>
        `;

        const emailMessage = {
            senderAddress: process.env.EMAIL_SENDER_ADDRESS,
            content: {
                subject: "Welcome to LIT - Your Weekly Fashion Fix!",
                html: htmlContent,
                plainText: `
Welcome to LIT - Your Weekly Fashion Fix!

Stay Ahead of Fashion Trends with LIT!

You're officially part of LIT's fashion-forward community! Get ready for weekly updates on Fast Fashion, Luxury Fashion, Sustainable Fashion, and the Sneaker Market to keep you informed.

We promise zero fluff, just pure fashion insights to keep you ahead of the curve.

Stay tuned for our first edition!

LIT Team

Follow Us on Socials:
LinkedIn: https://linkedin.com/company/luxuryintaste
Instagram: https://instagram.com/luxuryintaste
Facebook: https://facebook.com/luxuryintaste
Twitter: https://twitter.com/luxuryintaste
                `
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

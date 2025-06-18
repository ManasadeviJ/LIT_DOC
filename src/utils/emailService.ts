import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export const sendPaymentConfirmation = async (
  email: string,
  orderDetails: {
    orderId: string;
    amount: number;
    items: Array<{ name: string; quantity: number; price: number }>;
  }
) => {
  const itemsList = orderDetails.items
    .map((item) => `${item.name} x ${item.quantity} - ₹${item.price}`)
    .join('\n');

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Payment Confirmation - Your Order Details',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563EB;">Payment Successful!</h2>
        <p>Thank you for your purchase. Your order has been confirmed.</p>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af;">Order Details</h3>
          <p><strong>Order ID:</strong> ${orderDetails.orderId}</p>
          <p><strong>Total Amount:</strong> ₹${orderDetails.amount}</p>
          
          <h4 style="color: #1e40af; margin-top: 20px;">Items:</h4>
          <div style="margin-left: 20px;">
            ${itemsList}
          </div>
        </div>
        
        <p>We'll notify you when your order ships.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Payment confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending payment confirmation email:', error);
    throw error;
  }
};

export const sendPaymentFailure = async (
  email: string,
  orderId: string,
  error: string
) => {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: email,
    subject: 'Payment Failed - Action Required',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #dc2626;">Payment Failed</h2>
        <p>We were unable to process your payment for order ${orderId}.</p>
        
        <div style="background-color: #fef2f2; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Error Details:</strong> ${error}</p>
        </div>
        
        <p>Please try again or contact our support team if the problem persists.</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
          <p style="color: #6b7280; font-size: 14px;">
            If you have any questions, please contact our support team.
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Payment failure email sent successfully');
  } catch (error) {
    console.error('Error sending payment failure email:', error);
    throw error;
  }
}; 
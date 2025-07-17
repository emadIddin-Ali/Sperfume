import nodemailer from 'nodemailer';
import { CartItem } from './supabase';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Email templates
const createCustomerEmail = (customerName: string, customerEmail: string, cart: CartItem[], total: number) => {
  const itemsList = cart.map(item => 
    `- ${item.name} (Qty: ${item.quantity}) - ${(item.price * item.quantity).toFixed(2)} kr`
  ).join('\n');

  return {
    from: process.env.SMTP_FROM,
    to: customerEmail,
    subject: "Thank you for your order!",
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="font-family: 'Playfair Display', serif; color: #CBA135; margin-bottom: 20px;">
          Thank you for your order!
        </h1>
        
        <p>Dear ${customerName},</p>
        
        <p>We have received your order and are processing it. Here are your order details:</p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Order Summary:</h3>
          <div style="font-family: monospace; white-space: pre-line;">${itemsList}</div>
          <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
          <strong>Total: ${total.toFixed(2)} kr</strong>
        </div>
        
        <p>We will contact you soon with shipping details.</p>
        
        <p>Best regards,<br>Sakher Perfumes Team</p>
      </div>
    `
  };
};

const createAdminEmail = (customerName: string, customerEmail: string, cart: CartItem[], total: number) => {
  const itemsList = cart.map(item => 
    `- ${item.name} (Qty: ${item.quantity}) - ${(item.price * item.quantity).toFixed(2)} kr`
  ).join('\n');

  return {
    from: process.env.SMTP_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Order from ${customerName}`,
    html: `
      <div style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="font-family: 'Playfair Display', serif; color: #CBA135; margin-bottom: 20px;">
          New Order Received
        </h1>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0;">Customer Information:</h3>
          <p><strong>Name:</strong> ${customerName}</p>
          <p><strong>Email:</strong> ${customerEmail}</p>
          
          <h3 style="margin-top: 20px;">Order Details:</h3>
          <div style="font-family: monospace; white-space: pre-line;">${itemsList}</div>
          <hr style="margin: 15px 0; border: none; border-top: 1px solid #ddd;">
          <strong>Total: ${total.toFixed(2)} kr</strong>
        </div>
      </div>
    `
  };
};

export const sendOrderEmails = async (
  customerName: string, 
  customerEmail: string, 
  cart: CartItem[]
) => {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  try {
    console.log('Attempting to send emails...');
    console.log('SMTP Config:', {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      user: process.env.SMTP_USER,
      from: process.env.SMTP_FROM,
      adminEmail: process.env.ADMIN_EMAIL
    });
    
    // Send customer confirmation email
    const customerEmailResult = await transporter.sendMail(createCustomerEmail(customerName, customerEmail, cart, total));
    console.log('Customer email sent:', customerEmailResult);
    
    // Send admin notification email
    const adminEmailResult = await transporter.sendMail(createAdminEmail(customerName, customerEmail, cart, total));
    console.log('Admin email sent:', adminEmailResult);
    
    return { success: true };
  } catch (error) {
    console.error('Email sending failed:', error);
    console.error('Error details:', {
      message: (error as any).message,
      code: (error as any).code,
      command: (error as any).command
    });
    return { success: false, error };
  }
}; 
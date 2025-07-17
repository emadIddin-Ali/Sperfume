import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { sendOrderEmails } from '@/lib/email';
import { CartItem } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customer_name, customer_email, cart } = body;

    // Validate required fields
    if (!customer_name || !customer_email || !cart || !Array.isArray(cart)) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate cart items
    if (cart.length === 0) {
      return NextResponse.json(
        { error: 'Cart cannot be empty' },
        { status: 400 }
      );
    }

    // Validate cart item structure
    for (const item of cart) {
      if (!item.id || !item.name || typeof item.price !== 'number' || typeof item.quantity !== 'number') {
        return NextResponse.json(
          { error: 'Invalid cart item structure' },
          { status: 400 }
        );
      }
    }

    // Insert order into Supabase
    const { data: order, error: dbError } = await supabase
      .from('orders')
      .insert({
        customer_name,
        customer_email,
        cart,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      return NextResponse.json(
        { error: 'Failed to save order' },
        { status: 500 }
      );
    }

    // Send confirmation emails
    const emailResult = await sendOrderEmails(customer_name, customer_email, cart as CartItem[]);
    
    if (!emailResult.success) {
      console.error('Email sending failed:', emailResult.error);
      // Note: We don't fail the order if email fails, just log it
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      message: 'Order placed successfully'
    });

  } catch (error) {
    console.error('Order processing error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 
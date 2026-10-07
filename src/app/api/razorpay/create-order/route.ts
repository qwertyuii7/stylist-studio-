// src/app/api/razorpay/create-order/route.ts
import { NextResponse } from "next/server";
import { getRazorpayInstance } from "@/lib/razorpay";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, planId, bookingId, stylistId, userId } = body;

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return NextResponse.json(
        { error: "Invalid amount provided" },
        { status: 400 }
      );
    }

    const razorpay = getRazorpayInstance();

    // Amount strictly in INR paise (1 INR = 100 paise)
    const options = {
      amount: Math.round(amount * 100),
      currency: "INR",
      receipt: `rcpt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      notes: {
        planId: planId || "standard_booking",
        bookingId: bookingId || "",
        stylistId: stylistId || "",
        userId: userId || "guest_user",
      },
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error: any) {
    console.error("Razorpay order creation error:", error);
    return NextResponse.json(
      { error: error?.message || "Failed to create Razorpay order" },
      { status: 500 }
    );
  }
}

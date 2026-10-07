// src/actions/booking.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createAvailabilitySlot(data: {
  stylistProfileId: string;
  serviceTitle: string;
  startTime: Date;
  endTime: Date;
  priceAmount: number;
  mode: string;
}) {
  try {
    const slot = await prisma.bookingSlot.create({
      data: {
        stylistProfileId: data.stylistProfileId,
        serviceTitle: data.serviceTitle,
        startTime: new Date(data.startTime),
        endTime: new Date(data.endTime),
        priceAmount: data.priceAmount,
        mode: data.mode || "video",
        status: "PENDING",
      },
    });

    revalidatePath(`/stylist/${data.stylistProfileId}`);
    return { success: true, data: slot };
  } catch (error: any) {
    console.error("Error creating availability slot:", error);
    return { success: false, error: "Failed to create slot" };
  }
}

export async function getStylistAvailableSlots(
  stylistProfileId: string,
  startDate?: Date
) {
  try {
    const fromDate = startDate ? new Date(startDate) : new Date();

    const slots = await prisma.bookingSlot.findMany({
      where: {
        stylistProfileId,
        status: "PENDING",
        userId: null,
        startTime: { gte: fromDate },
      },
      orderBy: { startTime: "asc" },
    });

    return { success: true, data: slots };
  } catch (error: any) {
    console.error("Error fetching slots:", error);
    return { success: false, error: "Failed to load slots" };
  }
}

export async function reserveBookingSlot(data: {
  slotId: string;
  userId: string;
  paymentId?: string;
  razorpayOrderId?: string;
  notes?: string;
}) {
  try {
    const slot = await prisma.bookingSlot.update({
      where: { id: data.slotId },
      data: {
        userId: data.userId,
        status: "CONFIRMED",
        paymentId: data.paymentId,
        razorpayOrderId: data.razorpayOrderId,
        notes: data.notes,
      },
      include: {
        stylistProfile: true,
      },
    });

    // Update stylist earnings
    await prisma.stylistProfile.update({
      where: { id: slot.stylistProfileId },
      data: {
        totalEarnings: { increment: slot.priceAmount },
        pendingPayout: { increment: slot.priceAmount * 0.85 },
      },
    });

    revalidatePath(`/stylist/${slot.stylistProfileId}`);
    return { success: true, data: slot };
  } catch (error: any) {
    console.error("Error reserving slot:", error);
    return { success: false, error: "Failed to complete booking" };
  }
}

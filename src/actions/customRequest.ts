// src/actions/customRequest.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitCustomStylingRequest(data: {
  userId: string;
  stylistProfileId?: string;
  occasion: string;
  budget: number;
  heightCm: number;
  weightKg: number;
  preferredColors: string[];
  avoidColors: string[];
  fitPreference: string;
  inspirationUrls: string[];
  specialNotes?: string;
}) {
  try {
    const request = await prisma.customStylingRequest.create({
      data: {
        userId: data.userId,
        stylistProfileId: data.stylistProfileId,
        occasion: data.occasion,
        budget: data.budget,
        heightCm: data.heightCm,
        weightKg: data.weightKg,
        preferredColors: data.preferredColors,
        avoidColors: data.avoidColors,
        fitPreference: data.fitPreference,
        inspirationUrls: data.inspirationUrls,
        specialNotes: data.specialNotes,
        status: "SUBMITTED",
      },
    });

    return { success: true, data: request };
  } catch (error: any) {
    console.error("Error creating custom styling request:", error);
    return { success: false, error: "Failed to submit request" };
  }
}

export async function getUserCustomRequests(userId: string) {
  try {
    const requests = await prisma.customStylingRequest.findMany({
      where: { userId },
      include: {
        stylistProfile: {
          include: {
            user: {
              select: { name: true, avatarUrl: true },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return { success: true, data: requests };
  } catch (error: any) {
    console.error("Error fetching custom requests:", error);
    return { success: false, error: "Failed to load custom requests" };
  }
}

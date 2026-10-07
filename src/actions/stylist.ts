// src/actions/stylist.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function getStylistProfile(id: string) {
  try {
    const profile = await prisma.stylistProfile.findUnique({
      where: { id },
      include: {
        user: {
          select: { name: true, email: true, phone: true, avatarUrl: true },
        },
        portfolioItems: {
          orderBy: { createdAt: "desc" },
        },
        promotionalOffers: {
          where: {
            isActive: true,
            validUntil: { gt: new Date() },
          },
        },
        bookingSlots: {
          where: {
            startTime: { gte: new Date() },
            status: "PENDING",
          },
          orderBy: { startTime: "asc" },
        },
      },
    });

    return { success: true, data: profile };
  } catch (error: any) {
    console.error("Error fetching stylist profile:", error);
    return { success: false, error: "Failed to load stylist profile" };
  }
}

export async function getAllStylists(filter?: {
  genderSpecialty?: "WOMEN" | "MEN" | "UNISEX";
  aestheticTag?: string;
  destination?: string;
}) {
  try {
    const whereClause: any = {};
    if (filter?.genderSpecialty) {
      whereClause.genderSpecialty = filter.genderSpecialty;
    }
    if (filter?.destination) {
      whereClause.destinations = { has: filter.destination };
    }
    if (filter?.aestheticTag) {
      whereClause.aestheticTags = { has: filter.aestheticTag };
    }

    const stylists = await prisma.stylistProfile.findMany({
      where: whereClause,
      include: {
        user: {
          select: { name: true, avatarUrl: true },
        },
        portfolioItems: {
          take: 3,
        },
        promotionalOffers: {
          where: { isActive: true },
        },
      },
      orderBy: { rating: "desc" },
    });

    return { success: true, data: stylists };
  } catch (error: any) {
    console.error("Error querying stylists:", error);
    return { success: false, error: "Failed to fetch stylists" };
  }
}

export async function addPortfolioItem(data: {
  stylistProfileId: string;
  title: string;
  imageUrl: string;
  description: string;
  tags: string[];
}) {
  try {
    const item = await prisma.portfolioItem.create({
      data: {
        stylistProfileId: data.stylistProfileId,
        title: data.title,
        imageUrl: data.imageUrl,
        description: data.description,
        tags: data.tags,
      },
    });

    revalidatePath(`/stylist/${data.stylistProfileId}`);
    return { success: true, data: item };
  } catch (error: any) {
    console.error("Error adding portfolio item:", error);
    return { success: false, error: "Could not add portfolio item" };
  }
}

export async function createPromotionalOffer(data: {
  stylistProfileId: string;
  title: string;
  code: string;
  description: string;
  discountPercent: number;
  minBookingAmount?: number;
  validDays: number;
}) {
  try {
    const validUntil = new Date();
    validUntil.setDate(validUntil.getDate() + (data.validDays || 30));

    const offer = await prisma.promotionalOffer.create({
      data: {
        stylistProfileId: data.stylistProfileId,
        title: data.title,
        code: data.code.toUpperCase(),
        description: data.description,
        discountPercent: data.discountPercent,
        minBookingAmount: data.minBookingAmount || 0,
        validUntil,
        isActive: true,
      },
    });

    revalidatePath(`/stylist/${data.stylistProfileId}`);
    return { success: true, data: offer };
  } catch (error: any) {
    console.error("Error creating promotional offer:", error);
    return { success: false, error: "Failed to create offer" };
  }
}

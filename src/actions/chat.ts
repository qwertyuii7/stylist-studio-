// src/actions/chat.ts
"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function requestChatRoom(data: {
  userId: string;
  stylistProfileId: string;
  initialTopic: string;
}) {
  try {
    // Check if an active room already exists
    let room = await prisma.chatRoom.findFirst({
      where: {
        userId: data.userId,
        stylistProfileId: data.stylistProfileId,
        status: { in: ["REQUESTED", "ACCEPTED"] },
      },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
        },
      },
    });

    if (!room) {
      room = await prisma.chatRoom.create({
        data: {
          userId: data.userId,
          stylistProfileId: data.stylistProfileId,
          initialTopic: data.initialTopic,
          status: "REQUESTED",
        },
        include: {
          messages: true,
        },
      });
    }

    return { success: true, data: room };
  } catch (error: any) {
    console.error("Error creating chat request:", error);
    return { success: false, error: "Failed to send chat request" };
  }
}

export async function updateChatRoomStatus(
  roomId: string,
  status: "ACCEPTED" | "DECLINED" | "CLOSED"
) {
  try {
    const updated = await prisma.chatRoom.update({
      where: { id: roomId },
      data: { status },
    });
    return { success: true, data: updated };
  } catch (error: any) {
    console.error("Error updating chat room status:", error);
    return { success: false, error: "Failed to update chat room" };
  }
}

export async function sendMessage(data: {
  chatRoomId: string;
  senderId: string;
  content: string;
}) {
  try {
    const message = await prisma.message.create({
      data: {
        chatRoomId: data.chatRoomId,
        senderId: data.senderId,
        content: data.content,
      },
    });

    return { success: true, data: message };
  } catch (error: any) {
    console.error("Error sending message:", error);
    return { success: false, error: "Failed to send message" };
  }
}

export async function getStylistChatRooms(stylistProfileId: string) {
  try {
    const rooms = await prisma.chatRoom.findMany({
      where: { stylistProfileId },
      include: {
        user: {
          select: { id: true, name: true, avatarUrl: true, email: true },
        },
        messages: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
      },
      orderBy: { updatedAt: "desc" },
    });

    return { success: true, data: rooms };
  } catch (error: any) {
    console.error("Error fetching stylist chat rooms:", error);
    return { success: false, error: "Failed to load chats" };
  }
}

// src/components/chat/ChatInterface.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Send,
  Sparkles,
  Lock,
  CheckCheck,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Shield,
  HelpCircle,
} from "lucide-react";
import { sendMessage, updateChatRoomStatus, requestChatRoom } from "@/actions/chat";

export interface ChatMessageType {
  id: string;
  senderId: string;
  content: string;
  createdAt: string | Date;
  isRead?: boolean;
}

export interface ChatRoomType {
  id: string;
  userId: string;
  stylistProfileId: string;
  status: "REQUESTED" | "ACCEPTED" | "DECLINED" | "CLOSED";
  initialTopic?: string | null;
  messages: ChatMessageType[];
}

export default function ChatInterface({
  roomId,
  initialRoom,
  currentUserId,
  isStylist = false,
  otherPartyName = "Stylist",
  otherPartyAvatar = "/stylist_1.jpg",
  stylistProfileId,
}: {
  roomId?: string;
  initialRoom?: ChatRoomType | null;
  currentUserId: string;
  isStylist?: boolean;
  otherPartyName?: string;
  otherPartyAvatar?: string;
  stylistProfileId?: string;
}) {
  const [room, setRoom] = useState<ChatRoomType | null>(
    initialRoom || {
      id: roomId || "room-mock-1",
      userId: currentUserId,
      stylistProfileId: stylistProfileId || "sty-1",
      status: "ACCEPTED",
      initialTopic: "Outfit styling inquiry",
      messages: [
        {
          id: "m1",
          senderId: "other-id",
          content: `Hi there! I'm ${otherPartyName}. How can I assist with your wardrobe and styling today?`,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          isRead: true,
        },
      ],
    }
  );

  const [inputMessage, setInputMessage] = useState("");
  const [requestTopic, setRequestTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [room?.messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !room) return;

    const newMsg: ChatMessageType = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      content: inputMessage.trim(),
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setRoom((prev) =>
      prev
        ? {
            ...prev,
            messages: [...prev.messages, newMsg],
          }
        : null
    );
    setInputMessage("");

    // Persist via Server Action
    if (room.id && !room.id.startsWith("room-mock")) {
      await sendMessage({
        chatRoomId: room.id,
        senderId: currentUserId,
        content: newMsg.content,
      });
    }
  };

  const handleSendChatRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!requestTopic.trim()) return;
    setIsSubmitting(true);

    try {
      const res = await requestChatRoom({
        userId: currentUserId,
        stylistProfileId: stylistProfileId || "sty-1",
        initialTopic: requestTopic,
      });

      if (res.success && res.data) {
        setRoom(res.data as any);
      } else {
        // Fallback simulated room
        setRoom({
          id: `room-${Date.now()}`,
          userId: currentUserId,
          stylistProfileId: stylistProfileId || "sty-1",
          status: "REQUESTED",
          initialTopic: requestTopic,
          messages: [
            {
              id: `req-${Date.now()}`,
              senderId: currentUserId,
              content: `Chat Request: ${requestTopic}`,
              createdAt: new Date().toISOString(),
              isRead: false,
            },
          ],
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateStatus = async (newStatus: "ACCEPTED" | "DECLINED") => {
    if (!room) return;
    setRoom((prev) => (prev ? { ...prev, status: newStatus } : null));

    if (!room.id.startsWith("room-mock")) {
      await updateChatRoomStatus(room.id, newStatus);
    }
  };

  return (
    <div className="flex flex-col h-[650px] bg-white border border-border rounded-3xl overflow-hidden shadow-sm">
      {/* Chat Header */}
      <div className="p-4 md:p-5 bg-surface-muted border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden border border-border">
            <Image
              src={otherPartyAvatar}
              alt={otherPartyName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h4 className="font-semibold text-sm text-foreground">
                {otherPartyName}
              </h4>
              <span className="w-2 h-2 rounded-full bg-success" />
            </div>
            <p className="text-[11px] text-text-muted">
              {isStylist ? "Client Consultation" : "Verified Stylist • Online"}
            </p>
          </div>
        </div>

        {/* Status Badge */}
        <div>
          {room?.status === "REQUESTED" && (
            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <Clock size={12} /> Pending Approval
            </span>
          )}
          {room?.status === "ACCEPTED" && (
            <span className="bg-success-light text-success px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <CheckCircle2 size={12} /> Active Chat
            </span>
          )}
          {room?.status === "DECLINED" && (
            <span className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
              <XCircle size={12} /> Declined
            </span>
          )}
        </div>
      </div>

      {/* Main Chat Body */}
      {room?.status === "REQUESTED" && !isStylist ? (
        /* User Waiting Screen */
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock size={32} />
          </div>
          <h3 className="font-serif text-xl text-foreground">
            Chat Request Sent!
          </h3>
          <p className="text-sm text-text-secondary max-w-sm">
            {otherPartyName} will review your styling request regarding{" "}
            <span className="font-semibold text-foreground">
              "{room.initialTopic}"
            </span>
            . You will be able to message as soon as they accept.
          </p>
          <div className="bg-surface-muted p-4 rounded-2xl text-xs text-text-muted max-w-sm text-left flex items-start gap-2.5">
            <Shield size={16} className="text-accent shrink-0 mt-0.5" />
            <span>
              Stylists typically respond within 15-30 minutes during active hours.
            </span>
          </div>
        </div>
      ) : room?.status === "REQUESTED" && isStylist ? (
        /* Stylist Request Review Screen */
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-5">
          <div className="w-16 h-16 rounded-full bg-accent-light text-accent flex items-center justify-center">
            <MessageCircle size={32} />
          </div>
          <div>
            <h3 className="font-serif text-xl text-foreground">
              New Styling Inquiry
            </h3>
            <p className="text-sm text-text-secondary mt-1">
              {otherPartyName} wants to consult with you.
            </p>
          </div>

          <div className="bg-surface-muted border border-border rounded-2xl p-5 max-w-md w-full text-left">
            <div className="text-xs font-semibold text-text-muted uppercase mb-1">
              Inquiry Topic
            </div>
            <p className="text-sm font-medium text-foreground">
              "{room.initialTopic || "General wardrobe makeover advice"}"
            </p>
          </div>

          <div className="flex gap-3 w-full max-w-md">
            <button
              onClick={() => handleUpdateStatus("ACCEPTED")}
              className="flex-1 bg-accent text-white py-3 rounded-xl text-sm font-semibold hover:bg-accent-hover transition-colors flex items-center justify-center gap-1.5"
            >
              <CheckCircle2 size={16} /> Accept & Start Chat
            </button>
            <button
              onClick={() => handleUpdateStatus("DECLINED")}
              className="px-6 py-3 border border-border rounded-xl text-sm font-semibold text-text-secondary hover:bg-surface-muted transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      ) : room?.status === "DECLINED" ? (
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <XCircle size={32} />
          </div>
          <h3 className="font-serif text-xl text-foreground">
            Request Not Accepted
          </h3>
          <p className="text-sm text-text-secondary max-w-sm">
            The stylist is currently fully booked or unable to take new requests at this moment.
          </p>
        </div>
      ) : (
        /* Unlocked Active Message Thread */
        <>
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-white">
            {room?.messages?.map((msg) => {
              const isMe = msg.senderId === currentUserId;
              const formattedTime = new Date(msg.createdAt).toLocaleTimeString(
                [],
                { hour: "2-digit", minute: "2-digit" }
              );

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[75%] md:max-w-[65%] rounded-3xl px-5 py-3.5 shadow-sm ${
                      isMe
                        ? "bg-accent text-white rounded-br-xs"
                        : "bg-surface-muted text-foreground border border-border rounded-bl-xs"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                        isMe ? "text-white/70" : "text-text-muted"
                      }`}
                    >
                      <span>{formattedTime}</span>
                      {isMe && <CheckCheck size={13} className="text-white" />}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-4 bg-white border-t border-border flex items-center gap-3"
          >
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Message ${otherPartyName}...`}
              className="flex-1 px-5 py-3.5 bg-surface-muted border border-border rounded-full text-sm focus:outline-none focus:border-accent focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputMessage.trim()}
              className="bg-accent hover:bg-accent-hover text-white p-3.5 rounded-full transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md"
            >
              <Send size={18} />
            </button>
          </form>
        </>
      )}
    </div>
  );
}

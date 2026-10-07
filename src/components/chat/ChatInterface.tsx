// src/components/chat/ChatInterface.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Sparkles,
  CheckCheck,
  Clock,
  CheckCircle2,
  XCircle,
  MessageCircle,
  Shield,
  Video,
  Paperclip,
  Smile,
  Image as ImageIcon,
  Phone,
  MoreVertical,
  ChevronDown,
  Info,
  X,
} from "lucide-react";
import { sendMessage, updateChatRoomStatus, requestChatRoom } from "@/actions/chat";

export interface ChatMessageType {
  id: string;
  senderId: string;
  content: string;
  createdAt: string | Date;
  isRead?: boolean;
  attachmentUrl?: string;
  attachmentType?: "image" | "outfit_card";
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
      initialTopic: "Festive & Wedding Styling Inquiry",
      messages: [
        {
          id: "m1",
          senderId: "other-id",
          content: `Hi! I'm ${otherPartyName}. I'd love to help you curate your outfits and coordinate colors, silhouettes, and jewelry. What occasion are you getting styled for?`,
          createdAt: new Date(Date.now() - 3600000).toISOString(),
          isRead: true,
        },
      ],
    }
  );

  const [inputMessage, setInputMessage] = useState("");
  const [requestTopic, setRequestTopic] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showCallNotification, setShowCallNotification] = useState(false);
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null);

  // Quick replies
  const quickReplies = [
    "✨ Request festive season discount",
    "👗 Inquire about bridal package",
    "📅 Can we schedule a video session?",
    "🎨 Need help with color palette",
  ];

  // Container ref for localized scrolling without page jumping
  const chatScrollContainerRef = useRef<HTMLDivElement>(null);

  // Smooth local container scroll without affecting main window
  const scrollToBottom = (smooth = true) => {
    if (chatScrollContainerRef.current) {
      const container = chatScrollContainerRef.current;
      if (smooth) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      } else {
        container.scrollTop = container.scrollHeight;
      }
    }
  };

  useEffect(() => {
    // Scroll only container on initial mount & updates
    const timer = setTimeout(() => {
      scrollToBottom(false);
    }, 50);
    return () => clearTimeout(timer);
  }, [room?.messages.length]);

  const handleSendMessage = async (e?: React.FormEvent, customText?: string) => {
    if (e) e.preventDefault();
    const textToSend = customText || inputMessage.trim();
    if (!textToSend || !room) return;

    const newMsg: ChatMessageType = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      content: textToSend,
      createdAt: new Date().toISOString(),
      isRead: false,
      attachmentUrl: selectedAttachment || undefined,
      attachmentType: selectedAttachment ? "image" : undefined,
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
    setSelectedAttachment(null);

    // Smooth scroll inside container
    setTimeout(() => scrollToBottom(true), 100);

    // Simulate friendly auto-reply if in demo mode
    if (!isStylist && room.messages.length <= 2) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const replyMsg: ChatMessageType = {
          id: `reply-${Date.now()}`,
          senderId: "other-id",
          content: "That sounds wonderful! I've noted down your preferences. Let me prepare custom digital sketches and recommendations for you.",
          createdAt: new Date().toISOString(),
          isRead: true,
        };
        setRoom((prev) =>
          prev
            ? {
                ...prev,
                messages: [...prev.messages, replyMsg],
              }
            : null
        );
        setTimeout(() => scrollToBottom(true), 100);
      }, 2000);
    }

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
              content: `Styling Consultation Request: ${requestTopic}`,
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
    <div className="flex flex-col h-[640px] bg-white border border-border rounded-3xl overflow-hidden shadow-sm select-none">
      {/* ===== CHAT HEADER ===== */}
      <div className="p-4 px-6 bg-surface-muted/70 backdrop-blur-sm border-b border-border flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-2xl overflow-hidden border border-border shadow-xs">
            <Image
              src={otherPartyAvatar}
              alt={otherPartyName}
              fill
              className="object-cover"
            />
            <span className="absolute bottom-1 right-1 w-2.5 h-2.5 rounded-full bg-success border-2 border-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm text-foreground">
                {otherPartyName}
              </h4>
              <span className="bg-accent-light text-accent text-[10px] font-bold px-2 py-0.5 rounded-full">
                {isStylist ? "Client" : "Stylist"}
              </span>
            </div>
            <p className="text-[11px] text-text-muted flex items-center gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
              Active now • Responds in ~15 mins
            </p>
          </div>
        </div>

        {/* Action Controls in Header */}
        <div className="flex items-center gap-2">
          {room?.status === "ACCEPTED" && (
            <button
              onClick={() => {
                setShowCallNotification(true);
                setTimeout(() => setShowCallNotification(false), 4000);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-accent-light text-accent hover:bg-accent hover:text-white rounded-xl text-xs font-bold transition-all shadow-xs"
            >
              <Video size={14} />
              <span className="hidden sm:inline">Start Video Session</span>
            </button>
          )}

          {room?.status === "REQUESTED" && (
            <span className="bg-amber-50 text-amber-700 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
              <Clock size={12} /> Pending Approval
            </span>
          )}
        </div>
      </div>

      {/* Video Call Notification Banner */}
      <AnimatePresence>
        {showCallNotification && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-accent text-white p-2.5 px-5 text-xs font-semibold flex items-center justify-between shrink-0"
          >
            <div className="flex items-center gap-2">
              <Video size={15} />
              <span>Video Consultation room created. Meeting link ready!</span>
            </div>
            <button
              onClick={() => setShowCallNotification(false)}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== CHAT BODY ===== */}
      {room?.status === "REQUESTED" && !isStylist ? (
        /* User Waiting Screen */
        <div className="flex-1 p-8 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shadow-xs">
            <Clock size={32} />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground">
            Consultation Request Sent!
          </h3>
          <p className="text-xs text-text-secondary max-w-sm leading-relaxed">
            {otherPartyName} will review your styling topic{" "}
            <span className="font-bold text-foreground">
              "{room.initialTopic}"
            </span>
            . You will be able to message as soon as they accept.
          </p>
          <div className="bg-surface-muted border border-border p-4 rounded-2xl text-xs text-text-muted max-w-sm text-left flex items-start gap-2.5">
            <Shield size={16} className="text-accent shrink-0 mt-0.5" />
            <span>
              Direct consultation is gated to protect your privacy and ensure stylist preparation.
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
            <h3 className="font-serif text-xl font-bold text-foreground">
              New Client Consultation Inquiry
            </h3>
            <p className="text-xs text-text-secondary mt-1">
              {otherPartyName} would like to consult with you.
            </p>
          </div>

          <div className="bg-surface-muted border border-border rounded-2xl p-5 max-w-md w-full text-left">
            <div className="text-[10px] font-bold text-text-muted uppercase mb-1">
              Inquiry Focus
            </div>
            <p className="text-xs font-semibold text-foreground">
              "{room.initialTopic || "General wardrobe makeover advice"}"
            </p>
          </div>

          <div className="flex gap-3 w-full max-w-md">
            <button
              onClick={() => handleUpdateStatus("ACCEPTED")}
              className="flex-1 bg-accent text-white py-3 rounded-2xl text-xs font-bold hover:bg-accent-hover transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <CheckCircle2 size={15} /> Accept & Start Messaging
            </button>
            <button
              onClick={() => handleUpdateStatus("DECLINED")}
              className="px-5 py-3 border border-border rounded-2xl text-xs font-bold text-text-secondary hover:bg-surface-muted transition-colors"
            >
              Decline
            </button>
          </div>
        </div>
      ) : (
        /* Active Message Thread */
        <div className="flex-1 flex flex-col min-h-0">
          {/* Scrollable message container with isolated scrollbar */}
          <div
            ref={chatScrollContainerRef}
            className="flex-1 overflow-y-auto p-5 space-y-3.5 bg-gradient-to-b from-surface-muted/20 to-white scroll-smooth"
          >
            {room?.messages?.map((msg) => {
              const isMe = msg.senderId === currentUserId;
              const formattedTime = new Date(msg.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });

              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? "justify-end" : "justify-start"} animate-fade-in`}
                >
                  <div className={`flex items-end gap-2 max-w-[80%] md:max-w-[70%]`}>
                    {!isMe && (
                      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-border shrink-0 mb-1">
                        <Image
                          src={otherPartyAvatar}
                          alt={otherPartyName}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}

                    <div
                      className={`p-4 rounded-3xl shadow-xs transition-all ${
                        isMe
                          ? "bg-accent text-white rounded-br-xs"
                          : "bg-white text-foreground border border-border rounded-bl-xs"
                      }`}
                    >
                      {msg.attachmentUrl && (
                        <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden mb-2.5 border border-white/20">
                          <Image
                            src={msg.attachmentUrl}
                            alt="Attached outfit preview"
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}

                      <p className="text-xs md:text-sm leading-relaxed whitespace-pre-wrap font-normal">
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
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-text-muted animate-pulse">
                <div className="w-6 h-6 rounded-full overflow-hidden relative border border-border">
                  <Image src={otherPartyAvatar} alt={otherPartyName} fill className="object-cover" />
                </div>
                <span className="bg-surface-muted px-3 py-1.5 rounded-full text-[11px]">
                  {otherPartyName} is typing...
                </span>
              </div>
            )}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="px-5 py-2 bg-surface-muted/40 border-t border-border-light flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
            {quickReplies.map((qr, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(undefined, qr)}
                className="text-[11px] font-semibold bg-white hover:bg-accent-light hover:text-accent border border-border rounded-full px-3 py-1 whitespace-nowrap transition-colors shadow-xs shrink-0"
              >
                {qr}
              </button>
            ))}
          </div>

          {/* Attachment Preview Bar */}
          {selectedAttachment && (
            <div className="px-5 py-2 bg-accent-light/40 border-t border-accent/20 flex items-center justify-between text-xs text-accent font-semibold shrink-0">
              <div className="flex items-center gap-2">
                <ImageIcon size={14} />
                <span>Outfit photo ready to send</span>
              </div>
              <button
                onClick={() => setSelectedAttachment(null)}
                className="text-text-muted hover:text-foreground"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => handleSendMessage(e)}
            className="p-3.5 px-5 bg-white border-t border-border flex items-center gap-2.5 shrink-0"
          >
            <button
              type="button"
              onClick={() =>
                setSelectedAttachment(
                  selectedAttachment ? null : "/service_wardrobe.jpg"
                )
              }
              title="Attach look or swatch"
              className={`p-2.5 rounded-xl border transition-colors ${
                selectedAttachment
                  ? "bg-accent text-white border-accent"
                  : "text-text-muted hover:text-foreground border-border hover:bg-surface-muted"
              }`}
            >
              <Paperclip size={16} />
            </button>

            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={`Type your styling question or message...`}
              className="flex-1 px-4 py-3 bg-surface-muted border border-border rounded-2xl text-xs focus:outline-none focus:border-accent focus:bg-white transition-all placeholder:text-text-muted"
            />

            <button
              type="submit"
              disabled={!inputMessage.trim() && !selectedAttachment}
              className="bg-accent hover:bg-accent-hover text-white p-3 rounded-2xl transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shrink-0 flex items-center justify-center"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

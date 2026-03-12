"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/app/lib/db";
import { getCurrentUserId } from "@/app/lib/auth";

export async function startConversationAction(formData: FormData) {
  const listingId = formData.get("listingId") as string;
  if (!listingId) redirect("/listings");
  const result = await createConversationAction(listingId);
  if (result?.error) {
    redirect(`/listings/${listingId}?error=${encodeURIComponent(result.error)}`);
  }
}

export async function createConversationAction(listingId: string): Promise<{ error?: string } | void> {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const listing = await prisma.listing.findUnique({
    where: { id: listingId },
  });
  if (!listing) return { error: "Listing not found." };

  // Don't message your own listing
  if (listing.userId === userId) {
    return { error: "You cannot message your own listing." };
  }

  const conversation = await prisma.conversation.upsert({
    where: {
      listingId_studentUserId: { listingId, studentUserId: userId },
    },
    create: { listingId, studentUserId: userId },
    update: {},
  });

  revalidatePath("/messages");
  redirect(`/messages/${conversation.id}`);
}

export async function getConversations() {
  const userId = await getCurrentUserId();
  if (!userId) return [];

  const conversations = await prisma.conversation.findMany({
    where: {
      OR: [
        { studentUserId: userId },
        { listing: { userId } },
      ],
    },
    include: {
      listing: {
        select: {
          id: true,
          title: true,
          user: { select: { firstName: true, lastName: true } },
        },
      },
      student: { select: { id: true, firstName: true, lastName: true } },
      messages: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { body: true, createdAt: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return conversations.map((c) => ({
    id: c.id,
    listing: { id: c.listing.id, title: c.listing.title },
    otherParty:
      c.studentUserId === userId
        ? c.listing.user
          ? `${c.listing.user.firstName} ${c.listing.user.lastName}`
          : "Listing owner"
        : `${c.student.firstName} ${c.student.lastName}`,
    lastMessage: c.messages[0] ?? null,
    createdAt: c.createdAt,
  }));
}

export async function getThread(conversationId: string) {
  const userId = await getCurrentUserId();
  if (!userId) return null;

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
    include: {
      listing: {
        select: { id: true, title: true, userId: true },
      },
      student: { select: { id: true, firstName: true, lastName: true } },
      messages: {
        include: { sender: { select: { id: true, firstName: true, lastName: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!conversation) return null;

  // Must be participant (student or listing owner)
  const isParticipant =
    conversation.studentUserId === userId ||
    conversation.listing.userId === userId;
  if (!isParticipant) return null;

  return conversation;
}

export async function sendMessageAction(conversationId: string, body: string) {
  const userId = await getCurrentUserId();
  if (!userId) redirect("/login");

  const conversation = await prisma.conversation.findUnique({
    where: { id: conversationId },
  });
  if (!conversation) return { error: "Conversation not found." };

  const isParticipant =
    conversation.studentUserId === userId ||
    (await prisma.listing
      .findUnique({
        where: { id: conversation.listingId },
        select: { userId: true },
      })
      .then((l) => l?.userId === userId));

  if (!isParticipant) return { error: "You cannot send messages here." };

  const trimmed = body?.trim();
  if (!trimmed) return { error: "Message cannot be empty." };

  await prisma.message.create({
    data: {
      conversationId,
      senderUserId: userId,
      body: trimmed,
    },
  });

  revalidatePath("/messages");
  revalidatePath(`/messages/${conversationId}`);
  return { success: true };
}

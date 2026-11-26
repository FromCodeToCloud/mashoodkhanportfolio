import { NextResponse } from "next/server";

// Validates contact-form submissions and stores them in the main-db Postgres workload.

type MessageInput = { name: string; email: string; message: string };

function validate(body: unknown): { data?: MessageInput; error?: string } {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = String(b.name ?? "").trim();
  const email = String(b.email ?? "").trim();
  const message = String(b.message ?? "").trim();

  if (!name || name.length > 100) return { error: "Name is required (max 100 chars)." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200)
    return { error: "A valid email is required." };
  if (!message || message.length > 2000) return { error: "Message is required (max 2000 chars)." };

  return { data: { name, email, message } };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { data, error } = validate(body);
  if (error || !data) return NextResponse.json({ error }, { status: 400 });

  try {
    // Load Prisma lazily: the DB URL only exists at runtime, not during `next build`.
    const { default: prisma } = await import("@/lib/prisma/prisma");
    const saved = await prisma.message.create({ data });
    return NextResponse.json({ id: saved.id }, { status: 201 });
  } catch (err) {
    console.error("Failed to save message", err);
    return NextResponse.json({ error: "Couldn't save your message. Try again later." }, { status: 500 });
  }
}

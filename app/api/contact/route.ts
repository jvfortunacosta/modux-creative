import { NextRequest, NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const company = typeof body?.company === "string" ? body.company.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !message || !EMAIL_RE.test(email)) {
    return NextResponse.json({ ok: false, error: "invalid_input" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;

  // Sem RESEND_API_KEY + CONTACT_TO_EMAIL configurados no ambiente, o lead
  // fica registrado apenas no log do servidor. Configure as env vars para
  // o envio real de e-mail (ver README).
  if (!apiKey || !to) {
    console.log("[contato] novo lead (e-mail não configurado):", {
      name,
      email,
      company,
      message,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  const from = process.env.CONTACT_FROM_EMAIL || "MODUX Site <onboarding@resend.dev>";

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: email,
      subject: `Novo contato pelo site: ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\nEmpresa: ${company || "-"}\n\nMensagem:\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error("[contato] falha ao enviar via Resend:", await res.text());
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: true, delivered: true });
}

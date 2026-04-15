import { NextRequest, NextResponse } from 'next/server';

interface ContactPayload {
  nombre: string;
  whatsapp: string;
  ubicacion: string;
  cultivo: string;
  hectareas: number;
  mensaje?: string;
}

const REQUIRED_FIELDS: (keyof ContactPayload)[] = [
  'nombre',
  'whatsapp',
  'ubicacion',
  'cultivo',
  'hectareas',
];

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.N8N_WEBHOOK_URL;
  const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 });
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  for (const field of REQUIRED_FIELDS) {
    if (!body[field] && body[field] !== 0) {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  if (typeof body.hectareas !== 'number' || body.hectareas < 1) {
    return NextResponse.json(
      { error: 'hectareas must be a positive number' },
      { status: 400 }
    );
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };
  if (webhookSecret) {
    headers['Authorization'] = `Bearer ${webhookSecret}`;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        ...body,
        source: 'icarus-landing-form',
        timestamp: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      console.error('Webhook error:', response.status, await response.text());
      return NextResponse.json({ error: 'Webhook delivery failed' }, { status: 502 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error('Contact form error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

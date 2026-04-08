import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const client = new Anthropic();

export async function POST(req: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json({ error: "ANTHROPIC_API_KEY is not set in .env.local" }, { status: 500 });
  }

  const { mood, topic, syllables } = await req.json();

  const constraints: string[] = [];
  if (mood) constraints.push(`Mood: ${mood}`);
  if (topic) constraints.push(`Topic: ${topic}`);
  if (syllables) constraints.push(`Each line must have exactly ${syllables} syllables`);

  const constraintText =
    constraints.length > 0
      ? constraints.join("\n")
      : "No specific constraints — write freely.";

  const prompt = `You are a poet. Write a short, beautiful poem based on these constraints:

${constraintText}

Rules:
- The poem should be 4–8 lines long
- Do not include a title
- Do not include any explanation or preamble — return only the poem lines
- Make it evocative and emotionally resonant`;

  try {
    const message = await client.messages.create({
      model: "claude-opus-4-6",
      max_tokens: 512,
      messages: [{ role: "user", content: prompt }],
    });

    const poem =
      message.content[0].type === "text" ? message.content[0].text.trim() : "";

    return NextResponse.json({ poem });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

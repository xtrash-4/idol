// api/chat.js - Vercel Serverless Function untuk Groq AI Backend
export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed. Gunakan POST." });
  }

  try {
    const { messages, model, temperature } = req.body || {};

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Payload tidak valid: 'messages' harus berupa array." });
    }

    // Ambil API Key dari Vercel Environment Variable (GROQ_API_KEY)
    const apiKey = process.env.GROQ_API_KEY || (req.headers.authorization ? req.headers.authorization.replace("Bearer ", "").trim() : "");

    if (!apiKey) {
      return res.status(500).json({
        error: "GROQ_API_KEY belum disetel di Vercel Environment Variables. Silakan tambahkan di Settings -> Environment Variables di Dashboard Vercel."
      });
    }

    // Model fallback default yang aktif dan stabil di Groq
    const targetModel = model || process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: targetModel,
        messages: messages,
        temperature: temperature !== undefined ? temperature : 0.85,
        max_tokens: 450
      })
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      return res.status(response.status).json({
        error: errData.error?.message || `Groq API mengembalikan error code ${response.status}`
      });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Vercel Serverless Function Error:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
}

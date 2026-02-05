
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function getSmartSuggestion(conversationContext: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a helpful customer service agent. Based on the following chat history, suggest a professional and concise reply to the client. Return only the suggested text without any quotes or preamble.
      
      History:
      ${conversationContext}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });

    return response.text || "Não foi possível gerar uma sugestão no momento.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Erro ao processar sugestão inteligente.";
  }
}

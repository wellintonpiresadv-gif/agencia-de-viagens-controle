
import { GoogleGenAI } from "@google/genai";

// Função para obter o cliente de forma segura, evitando erros se a chave estiver ausente
const getAiClient = () => {
  const apiKey = (window as any).process?.env?.API_KEY || "";
  if (!apiKey) {
    console.warn("API_KEY não encontrada. As sugestões de IA estarão desativadas.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function getSmartSuggestion(conversationContext: string): Promise<string> {
  try {
    const ai = getAiClient();
    if (!ai) return "Sugestão inteligente indisponível (Chave API não configurada).";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um atendente de suporte prestativo. Baseado no histórico abaixo, sugira uma resposta curta e profissional em português para o cliente. Retorne apenas o texto da resposta.
      
      Histórico:
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

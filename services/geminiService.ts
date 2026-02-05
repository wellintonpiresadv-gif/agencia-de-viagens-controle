
import { GoogleGenAI } from "@google/genai";

const getAiClient = () => {
  // Tenta obter de múltiplas fontes possíveis de injeção
  const apiKey = (window as any).process?.env?.API_KEY || "";
  
  if (!apiKey) {
    console.warn("Gemini API Key não detectada. O botão de sugestão funcionará em modo limitado.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export async function getSmartSuggestion(conversationContext: string): Promise<string> {
  try {
    const ai = getAiClient();
    if (!ai) return "Por favor, configure a API_KEY nas variáveis de ambiente para usar a IA.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Você é um atendente especializado. Sugira uma resposta profissional para este chat:
      
      ${conversationContext}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 150,
      }
    });

    return response.text || "Não consegui pensar em uma resposta agora.";
  } catch (error) {
    console.error("Erro na IA:", error);
    return "Falha ao gerar sugestão. Verifique sua cota da API.";
  }
}

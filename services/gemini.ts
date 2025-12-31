
import { GoogleGenAI } from "@google/genai";
import { Message } from "../types";

/**
 * Fetches a response from the Gemini AI model using the provided prompt and chat history.
 * Uses the gemini-3-flash-preview model for basic text/architectural reasoning tasks.
 */
export const getGeminiResponse = async (prompt: string, history: Message[]) => {
  try {
    // Initialize GoogleGenAI with the API key from environment variables.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Map existing chat history to the format expected by the Gemini SDK.
    const geminiHistory = history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));

    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      history: geminiHistory,
      config: {
        systemInstruction: `You are an elite AI Architect specializing in the "Modern Agentic Stack": 
        - LangGraph: For stateful, multi-agent orchestration and cyclic workflows.
        - FastAPI: Specifically using StreamingResponse and SSE to bridge agents to the UI.
        - Next.js: Handling streaming data with React Server Components or Client-side EventSource.
        - Docker: Optimizing for Python async workloads.
        - UIAssistant: The UI library used for building interactive AI components.

        Your goal is to explain how to integrate LangGraph agents with a FastAPI backend. 
        Focus on:
        1. FastAPI's StreamingResponse for piping 'astream_events' from LangGraph.
        2. Managing Thread IDs in FastAPI middleware or dependency injection for state persistence.
        3. Correctly typing Pydantic schemas for multi-modal agent inputs.
        4. Exposing ToolNodes securely via API.

        Keep responses technical, code-focused, and authoritative.`,
        temperature: 0.7,
      },
    });

    const response = await chat.sendMessage({ message: prompt });
    return response.text || "I'm sorry, I couldn't process that request.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Unable to connect to the AI assistant. Please check your API configuration.";
  }
};

import { api } from "./client";

export const askFinanceAI = async (message: string) => {
  const res = await api.post("/ai/chat", { userMessage: message });
  return res.data;
};

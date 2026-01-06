// frontend/src/api/expensesApi.ts
import { api } from "./client";

export const createExpense = async (payload: {
  category: string;
  amount: number;
  date: string;
  time?: string;
}) => {
  const res = await api.post("/expenses", payload);
  return res.data;
};

export const getExpenses = async (date?: string) => {
  const params = date ? { date } : {};
  const res = await api.get("/expenses", { params });
  return res.data;
};

export const updateExpense = async (id: string, payload: any) => {
  const res = await api.put(`/expenses/${id}`, payload);
  return res.data;
};

export const deleteExpense = async (id: string) => {
  const res = await api.delete(`/expenses/${id}`);
  return res.data;
};

export const getSummary = async () => {
  const res = await api.get("/expenses/summary");
  return res.data;
};


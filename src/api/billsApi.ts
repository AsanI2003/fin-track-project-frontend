
import { api } from "./client";

export const uploadBill = async (payload: FormData) => {
  const res = await api.post("/bills", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getBills = async () => {
  const res = await api.get("/bills");
  return res.data;
};

export const deleteBill = async (id: string) => {
  const res = await api.delete(`/bills/${id}`);
  return res.data;
};

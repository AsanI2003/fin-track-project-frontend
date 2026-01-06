
import { api } from "./client";

export const uploadBill = async (payload: FormData) => {
  const res = await api.post("api/bills", payload, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getBills = async () => {
  const res = await api.get("api/bills");
  return res.data;
};

export const deleteBill = async (id: string) => {
  const res = await api.delete(`api/bills/${id}`);
  return res.data;
};

// src/pages/BillGallery.tsx
import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Button } from "@mui/material";
import { getBills, uploadBill, deleteBill } from "../../api/billsApi";

type Bill = {
  _id: string;
  imageUrl: string;
  uploadedAt: string;
};

const BillGallery: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [file, setFile] = useState<File | null>(null);

  const loadBills = async () => {
    const res = await getBills();
    setBills(res.bills);
  };

  useEffect(() => {
    loadBills();
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    const fd = new FormData();
    fd.append("bill", file);
    await uploadBill(fd);
    setFile(null);
    loadBills();
  };

  const handleDelete = async (id: string) => {
    await deleteBill(id);
    setBills((prev) => prev.filter((b) => b._id !== id));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Bill Gallery</Typography>

      <Box mb={2}>
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
        <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }}>Upload Bill</Button>
      </Box>

      <Grid container spacing={2}>
        {bills.map((bill) => (
          <Grid item xs={12} md={4} key={bill._id}>
            <Paper sx={{ p: 2 }}>
              <img src={bill.imageUrl} alt="Bill" style={{ width: "100%", borderRadius: 8 }} />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Uploaded: {new Date(bill.uploadedAt).toLocaleString()}
              </Typography>
              <Button color="error" onClick={() => handleDelete(bill._id)} sx={{ mt: 1 }}>
                Delete
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BillGallery;

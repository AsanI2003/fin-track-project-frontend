// src/pages/BillGallery.tsx
import React, { useEffect, useState } from "react";
import { Box, Grid, Paper, Typography, Button, CircularProgress, Alert } from "@mui/material";
import { getBills, uploadBill, deleteBill } from "../../api/billsApi";

type Bill = {
  _id: string;
  imageUrl: string;
  uploadedAt: string;
};

const BillGallery: React.FC = () => {
  const [bills, setBills] = useState<Bill[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadBills = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getBills();
      setBills(res.bills || []);
    } catch (err: any) {
      console.error("Failed to load bills:", err);
      setError(err?.response?.data?.message || err.message || "Failed to load bills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBills();
  }, []);

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }
    try {
      setLoading(true);
      setError(null);
      const fd = new FormData();
      fd.append("bill", file);
      const res = await uploadBill(fd);
      console.log("Upload response:", res);
      setFile(null);
      await loadBills();
    } catch (err: any) {
      console.error("Upload failed:", err);
      setError(err?.response?.data?.message || err.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError(null);
      await deleteBill(id);
      setBills((prev) => prev.filter((b) => b._id !== id));
    } catch (err: any) {
      console.error("Delete failed:", err);
      setError(err?.response?.data?.message || err.message || "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Bill Gallery</Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box mb={2} display="flex" alignItems="center">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        <Button variant="contained" onClick={handleUpload} sx={{ ml: 2 }} disabled={loading}>
          {loading ? <CircularProgress size={20} /> : "Upload Bill"}
        </Button>
      </Box>

      {loading && bills.length === 0 ? (
        <CircularProgress />
      ) : (
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
      )}
    </Box>
  );
};

export default BillGallery;

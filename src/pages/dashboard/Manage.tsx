// frontend/src/pages/ExpensesPage.tsx
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  TextField,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Typography,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import ExpenseCard from "../../components/ExpenseCard";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "../../api/expensesApi";
import { validateExpense } from "../../utils/validation/expenseValidation";

const categories = [
  "Food & Groceries",
  "Housing & Utilities",
  "Transportation",
  "Healthcare",
  "Debt/Loans",
  "Savings/Investments",
  "Miscellaneous",
];

type Expense = {
  _id: string;
  category: string;
  amount: number;
  date: string;
  time?: string;
};

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchDate, setSearchDate] = useState<string>("");
  const [openForm, setOpenForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({ category: "", amount: "", date: "", time: "" });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});
  const [snack, setSnack] = useState<{ open: boolean; message: string; severity?: "success" | "error" }>({ open: false, message: "" });

  const load = async (date?: string) => {
    try {
      setLoading(true);
      const res = await getExpenses(date);
      setExpenses(res.expenses);
    } catch (err: any) {
      console.error(err);
      setSnack({ open: true, message: err?.response?.data?.message || "Failed to load expenses", severity: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleSearch = async () => {
    if (!searchDate) {
      load();
      return;
    }
    await load(searchDate);
  };

  const openAdd = () => {
    setEditingId(null);
    setForm({ category: "", amount: "", date: "", time: "" });
    setErrors({});
    setOpenForm(true);
  };

  const openEdit = (id: string) => {
    const e = expenses.find((x) => x._id === id);
    if (!e) return;
    setEditingId(id);
    setForm({ category: e.category, amount: String(e.amount), date: e.date.slice(0, 10), time: e.time || "" });
    setErrors({});
    setOpenForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      setSnack({ open: true, message: "Deleted", severity: "success" });
      setExpenses((prev) => prev.filter((p) => p._id !== id));
    } catch (err: any) {
      setSnack({ open: true, message: err?.response?.data?.message || "Delete failed", severity: "error" });
    }
  };

  const handleSubmit = async () => {
    const v = validateExpense({ category: form.category, amount: Number(form.amount), date: form.date });
    if (Object.keys(v).length) {
      setErrors(v);
      return;
    }
    try {
      if (editingId) {
        const res = await updateExpense(editingId, { category: form.category, amount: Number(form.amount), date: form.date, time: form.time });
        setExpenses((prev) => prev.map((p) => (p._id === editingId ? res.expense : p)));
        setSnack({ open: true, message: "Updated", severity: "success" });
      } else {
        const res = await createExpense({ category: form.category, amount: Number(form.amount), date: form.date, time: form.time });
        setExpenses((prev) => [res.expense, ...prev]);
        setSnack({ open: true, message: "Saved", severity: "success" });
      }
      setOpenForm(false);
    } catch (err: any) {
      setSnack({ open: true, message: err?.response?.data?.message || "Save failed", severity: "error" });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box display="flex" gap={2} alignItems="center" mb={3} flexWrap="wrap">
        <TextField
          label="Search by date"
          type="date"
          value={searchDate}
          onChange={(e) => setSearchDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: 220 }}
        />
        <IconButton color="primary" onClick={handleSearch}><SearchIcon /></IconButton>
        <Box flexGrow={1} />
        <Button variant="contained" startIcon={<AddIcon />} onClick={openAdd}>Add Expense</Button>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={6}><CircularProgress /></Box>
      ) : expenses.length === 0 ? (
        <Typography variant="body1">No expenses found.</Typography>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            {expenses.map((e) => (
              <ExpenseCard
                key={e._id}
                id={e._id}
                category={e.category}
                amount={e.amount}
                date={e.date}
                time={e.time}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            {/* Summary or quick stats can go here */}
            <Box sx={{ position: { md: "sticky" }, top: 16 }}>
              <Typography variant="h6">Summary</Typography>
              <Typography variant="body2" mt={1}>Total: ₹ {expenses.reduce((s, x) => s + x.amount, 0).toFixed(2)}</Typography>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Add / Edit Dialog */}
      <Dialog open={openForm} onClose={() => setOpenForm(false)} fullWidth>
        <DialogTitle>{editingId ? "Update Expense" : "Add Expense"}</DialogTitle>
        <DialogContent>
          <TextField
            select
            label="Category"
            fullWidth
            margin="normal"
            value={form.category}
            onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            error={!!errors.category}
            helperText={errors.category}
          >
            {categories.map((c) => <MenuItem key={c} value={c}>{c}</MenuItem>)}
          </TextField>

          <TextField
            label="Amount"
            fullWidth
            margin="normal"
            value={form.amount}
            onChange={(e) => setForm((s) => ({ ...s, amount: e.target.value }))}
            error={!!errors.amount}
            helperText={errors.amount}
          />

          <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            onChange={(e) => setForm((s) => ({ ...s, date: e.target.value }))}
            error={!!errors.date}
            helperText={errors.date}
          />

          <TextField
            label="Time (optional)"
            type="time"
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            value={form.time}
            onChange={(e) => setForm((s) => ({ ...s, time: e.target.value }))}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>{editingId ? "Update" : "Save"}</Button>
        </DialogActions>
        
      </Dialog>

      <Snackbar open={snack.open} autoHideDuration={4000} onClose={() => setSnack((s) => ({ ...s, open: false }))}>
        <Alert severity={snack.severity || "success"} sx={{ width: "100%" }}>{snack.message}</Alert>
      </Snackbar>
    </Container>
  );
};

export default ExpensesPage;

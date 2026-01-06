// frontend/src/components/ExpenseCard.tsx
import React from "react";
import { Card, CardContent, Typography, CardActions, Button, Box } from "@mui/material";

type Props = {
  id: string;
  category: string;
  amount: number;
  date: string;
  time?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

const ExpenseCard: React.FC<Props> = ({ id, category, amount, date, time, onEdit, onDelete }) => {
  const d = new Date(date);
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {category}
        </Typography>
        <Typography variant="h6">₹ {amount.toFixed(2)}</Typography>
        <Box display="flex" justifyContent="space-between" mt={1}>
          <Typography variant="body2">{d.toLocaleDateString()}</Typography>
          <Typography variant="body2">{time || d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</Typography>
        </Box>
        
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => onEdit(id)}>Update</Button>
        <Button size="small" color="error" onClick={() => onDelete(id)}>Delete</Button>
      </CardActions>
    </Card>
  );
};

export default ExpenseCard;

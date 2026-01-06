export const validateExpense = (form: {
  category?: string;
  amount?: number | string;
  date?: string;
}) => {
  const errors: { [k: string]: string } = {};
  const categories = [
    "Food & Groceries",
    "Housing & Utilities",
    "Transportation",
    "Healthcare",
    "Debt/Loans",
    "Savings/Investments",
    "Miscellaneous",
  ];

  if (!form.category) errors.category = "Category is required";
  else if (!categories.includes(form.category)) errors.category = "Invalid category";

  if (form.amount === undefined || form.amount === null || form.amount === "") {
    errors.amount = "Amount is required";
  } else if (isNaN(Number(form.amount)) || Number(form.amount) <= 0) {
    errors.amount = "Enter a valid positive amount";
  }

  if (!form.date) errors.date = "Date is required";
  else if (isNaN(new Date(form.date).getTime())) errors.date = "Enter a valid date";

  return errors;
};

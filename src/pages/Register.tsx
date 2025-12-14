import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { validateRegister } from "../utils/validation/registerValidation";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newErrors = validateRegister(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Dispatch Redux login (after register, treat as logged in)
    dispatch(loginSuccess({ user: { name: form.name, email: form.email }, token: "fakeToken123" }));
    console.log("Register successful:", form);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Create Your FinTrack Pro Account</Typography>

      <TextField label="Name" name="name" fullWidth margin="normal"
        value={form.name} onChange={handleChange} error={!!errors.name} helperText={errors.name} />
      <TextField label="Email" name="email" type="email" fullWidth margin="normal"
        value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal"
        value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
        Register
      </Button>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        Already have an account? <MuiLink component={Link} to="/login" underline="hover">Login</MuiLink>
      </Typography>
    </Box>
  );
};

export default Register;

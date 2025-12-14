import React, { useState } from "react";
import { Box, TextField, Button, Typography, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";
import { validateLogin } from "../utils/validation/loginValidation";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newErrors = validateLogin(form);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    // Dispatch Redux login
    dispatch(loginSuccess({ user: { email: form.email }, token: "fakeToken123" }));
    console.log("Login successful:", form);
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 6, p: 3, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom>Login to FinTrack Pro</Typography>

      <TextField label="Email" name="email" type="email" fullWidth margin="normal"
        value={form.email} onChange={handleChange} error={!!errors.email} helperText={errors.email} />
      <TextField label="Password" name="password" type="password" fullWidth margin="normal"
        value={form.password} onChange={handleChange} error={!!errors.password} helperText={errors.password} />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>
        Login
      </Button>

      <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
        New user? <MuiLink component={Link} to="/register" underline="hover">Register now</MuiLink>
      </Typography>
    </Box>
  );
};

export default Login;

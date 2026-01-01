export const registerUser = async (form: { name: string; email: string; password: string }) => {
  const res = await fetch("http://localhost:5000/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
};

export const loginUser = async (form: { email: string; password: string }) => {
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
  return res.json();
};

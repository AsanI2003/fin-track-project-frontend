export const validateLogin = (form: { email: string; password: string }) => {
  const errors: { [key: string]: string } = {};

  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!form.email) {
    errors.email = "Email is required";
  } else if (!emailRegex.test(form.email)) {
    errors.email = "Enter a valid email address";
  }

  if (!form.password) {
    errors.password = "Password is required";
  } else if (!/^[A-Za-z0-9]+$/.test(form.password)) {
    errors.password = "Password must contain only letters and numbers";
  } else if (form.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  }

  return errors;
};

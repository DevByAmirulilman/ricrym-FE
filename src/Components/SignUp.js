import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Stack,
  Card as MuiCard,
  Dialog,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import TwoFactorAuth from "./TwoFactorAuth";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: "80vh",
  padding: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    padding: theme.spacing(4),
  },
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));

export default function SignUp({ open, handleClose }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(false);
  const [accountId, setAccountId] = useState("");

  const validateInputs = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.username) {
      newErrors.username = "Username is required.";
      isValid = false;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateInputs()) {
      axios
        .post("http://localhost:5000/api/register", formData)
        .then((response) => {
          setAccountId(response.data.user.id); // Assume API returns user ID
          setIsTwoFactorEnabled(true); // Enable 2FA view
          handleClose()
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };



  return (
    <Dialog open={open} onClose={handleClose}>
      <CssBaseline />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ fontSize: "clamp(2rem, 10vw, 2.15rem)", fontWeight: "bold" }}
          >
            Sign up
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <FormControl>
              <FormLabel htmlFor="username">Username</FormLabel>
              <TextField
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Jon Snow"
                error={Boolean(errors.username)}
                helperText={errors.username}
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                error={Boolean(errors.email)}
                helperText={errors.email}
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                placeholder="••••••"
                error={Boolean(errors.password)}
                helperText={errors.password}
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Sign up
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </Dialog>
  );
}

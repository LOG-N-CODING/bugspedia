import { Email, Lock, Login as LoginIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Container,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Layout from "../Layout";

const Login: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch {
      setError("Failed to log in");
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            mt: 0,
            borderRadius: 4,

            transition: "transform 0.3s ease",
          }}
        >
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            color="primary"
            sx={{
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <LoginIcon fontSize="large" />
            Welcome Back
          </Typography>

          <Typography align="center" sx={{ color: "text.secondary", mb: 3 }}>
            Please enter your login credentials
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} noValidate>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 3,
                py: 1.5,
                fontWeight: "bold",
                fontSize: "1rem",
                borderRadius: 2,
              }}
            >
              Log In
            </Button>

            <Button
              onClick={() => navigate("/signup")}
              color="warning"
              fullWidth
              sx={{ mt: 2 }}
            >
              Don&apos;t have an account? Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login;

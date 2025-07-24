import { Email, Lock, Person, PersonAdd } from "@mui/icons-material";
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

const Signup: React.FC = () => {
  const { signup } = useAuth();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      await signup(email, password, name);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Failed to create an account");
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper
          elevation={6}
          sx={{
            p: 5,
            mt: 10,
            borderRadius: 4,
            transition: "transform 0.3s ease",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: 10,
            },
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
            <PersonAdd fontSize="large" />
            Create Account
          </Typography>

          <Typography align="center" sx={{ color: "text.secondary", mb: 3 }}>
            Start your bug-catching journey today!
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
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person />
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
              Sign Up
            </Button>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Signup;

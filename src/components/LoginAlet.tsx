import LoginIcon from "@mui/icons-material/Login";
import { Box, Button, Paper, Typography, useTheme } from "@mui/material";
import React from "react";
import Layout from "../Layout";

const LoginAlert: React.FC = () => {
  const theme = useTheme();

  return (
    <Layout>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        mt={-20}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 600,
            textAlign: "center",
            borderRadius: 4,
            backdropFilter: "blur(8px)",
            backgroundColor: "rgba(255, 255, 255, 0.75)",
            transition: "all 0.3s ease",
            p: 10,
          }}
        >
          <Typography
            variant="h3"
            color="primary"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            🪲 Welcome to <span style={{ color: "#388e3c" }}>BugsPedia</span>!
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
            Discover, collect, and quiz your way through the world of insects!
          </Typography>

          <Button
            variant="contained"
            color="primary"
            href="/login"
            size="large"
            startIcon={<LoginIcon />}
            sx={{
              px: 5,
              py: 1.75,
              fontWeight: "bold",
              fontSize: "1rem",
              borderRadius: 3,
              textTransform: "none",
              boxShadow: 3,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Log In to Begin
          </Button>
        </Paper>
      </Box>
    </Layout>
  );
};

export default LoginAlert;

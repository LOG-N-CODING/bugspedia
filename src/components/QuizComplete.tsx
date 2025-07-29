import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti";
import React, { useEffect, useState } from "react";

const QuizComplete: React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const correctCount = Number(params.get("score")) || 0;
  const totalQuestions = Number(params.get("total")) || 5;
  const attempts = Number(params.get("attempts")) || 0;
  const onBackHome = () => navigate("/quiz");

  // 화면 크기 가져오기 (Quiz.tsx와 동일)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={150}
        recycle={true}
        gravity={0.25}
        initialVelocityY={12}
      />
      <Container
      maxWidth="sm"
      sx={{
        mt: 8,
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
        bgcolor: "#f1f8e9",
        borderRadius: 3,
        p: 12,
        boxShadow: 8,
      }}
    >
      {/* Confetti Sparkles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{
              y: -50,
              opacity: 0,
              rotate: 0,
              x: Math.random() * 300,
            }}
            animate={{
              y: [0, 30, 0],
              opacity: [1, 0.5, 1],
              rotate: [0, 360, 0],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.15,
            }}
            style={{
              position: "absolute",
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: "gold",
              left: Math.random() * 100 + "%",
              top: Math.random() * 100 + "%",
              boxShadow: "0 0 6px gold",
            }}
          />
        ))}
      </Box>

      {/* Bouncing Hooray! */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1.3, opacity: 1 }}
        transition={{
          type: "spring",
          stiffness: 260,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Typography variant="h3" color="success.dark" fontWeight="bold" mb={10}>
          🎉 Great Work! 🎉
        </Typography>
      </motion.div>

      <Typography mb={4}>
        You answered <strong>{correctCount}</strong> out of {totalQuestions}{" "}
        questions correctly on the first try!
      </Typography>
      <Typography variant="h5" mb={3}>
        You earned <strong>{correctCount} point</strong>. Thanks for playing!
      </Typography>

      <Typography mb={4}>
        Total attempts made: <strong>{attempts}</strong>
      </Typography>

      <Button
        variant="contained"
        color="success"
        size="large"
        sx={{
          px: 5,
          fontWeight: "bold",
          textTransform: "none",
          boxShadow: 6,
          "&:hover": {
        boxShadow: 12,
        scale: 1.05,
          },
        }}
        onClick={onBackHome}
      >
        Retry Quiz
      </Button>
      </Container>
    </>
  );
};

export default QuizComplete;

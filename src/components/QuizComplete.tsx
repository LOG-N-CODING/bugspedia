import { Box, Button, Container, Typography } from "@mui/material";
import { motion } from "framer-motion";

const QuizComplete: React.FC<{
  correctCount: number;
  totalQuestions: number;
  attempts: number;
  onBackHome: () => void;
}> = ({ correctCount, totalQuestions, attempts, onBackHome }) => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 16,
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
        Back to Home
      </Button>
    </Container>
  );
};

export default QuizComplete;

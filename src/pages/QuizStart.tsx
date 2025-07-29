import { Box, Button, Paper, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import { QUIZ_QUESTIONS } from "./Quiz";

const QuizStart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 4,
        }}
      >
        <Paper
          elevation={10}
          sx={{
            p: 6,
            borderRadius: 5,
            maxWidth: 500,
            textAlign: "center",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ display: "inline-block" }}
          >
            <Typography
              variant="h3"
              color="success.main"
              sx={{ fontWeight: 800, mb: 2, userSelect: "none" }}
            >
              🧠 Insect Quiz
            </Typography>
            
          </motion.div>

          <Typography
            variant="h6"
            color="text.secondary"
            gutterBottom
            sx={{ mb: 4, fontWeight: 500 }}
          >
            Answer {QUIZ_QUESTIONS} questions to earn a point and unlock a card!
          </Typography>

          <Typography mb={4} border={1} borderColor="success.light" p={2} borderRadius={2} color={"green"}>
            You answered questions correctly on the first try!
          </Typography>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              onClick={() => navigate("/quiz/play")}
              sx={{
                px: 6,
                py: 1.8,
                fontSize: "1.2rem",
                fontWeight: 700,
                borderRadius: 3,
                boxShadow: "0 6px 15px rgba(56, 142, 60, 0.6)",
                textTransform: "none",
              }}
            >
              Start Quiz
            </Button>
          </motion.div>
        </Paper>
      </Box>
    </Layout>
  );
};

export default QuizStart;

import { VolumeOff, VolumeUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { doc, increment, updateDoc } from "firebase/firestore";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import InsectCard from "../components/InsectCard";
import LoginAlert from "../components/LoginAlet";
import QuizComplete from "../components/QuizComplete";
import { useAuth } from "../contexts/AuthContext";
import { quizQuestions } from "../data/quizQuestions"; // static local import
import Layout from "../Layout";
import { db } from "../utils/firebase";

export const QUIZ_QUESTIONS = 5;

const Quiz: React.FC = () => {
  const { user } = useAuth();

  const [shuffled] = useState(() =>
    [...quizQuestions].sort(() => 0.5 - Math.random()).slice(0, QUIZ_QUESTIONS)
  );

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [attemptsThisQuestion, setAttemptsThisQuestion] = useState(0);
  const [showCard, setShowCard] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  // Mute state and audio ref
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Play audio on load (muted initially)
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.15; // gentle volume
      audioRef.current.muted = isMuted;
      audioRef.current.play().catch(() => {
        // Autoplay might be blocked, mute default helps
      });
    }
  }, [isMuted]);

  const toggleMute = () => {
    setIsMuted((m) => !m);
    if (audioRef.current) {
      audioRef.current.muted = !audioRef.current.muted;
    }
  };

  const question = shuffled[current];

  const handleAnswer = (option: string) => {
    if (selected) return;

    setSelected(option);
    setAttempts((prev) => prev + 1);
    setAttemptsThisQuestion((prev) => prev + 1);

    if (option === question.answer) {
      setIsWrong(false);
      if (attemptsThisQuestion === 0) {
        setCorrectCount((prev) => prev + 1);
      }
      setTimeout(() => {
        setShowCard(true);
      }, 700);
    } else {
      setIsWrong(true);
      setTimeout(() => {
        setSelected(null);
        setIsWrong(false);
      }, 1500);
    }
  };

  const nextQuestion = async () => {
    const nextIndex = current + 1;
    if (nextIndex >= QUIZ_QUESTIONS) {
      setQuizComplete(true);
      try {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, { points: increment(correctCount) });
      } catch (err) {
        console.error("Failed to update points:", err);
      }
    } else {
      setCurrent(nextIndex);
      setShowCard(false);
      setSelected(null);
      setAttemptsThisQuestion(0);
      setIsWrong(false);
    }
  };

  if (!user) return <LoginAlert />;

  if (quizComplete)
    return (
      <Layout>
        <QuizComplete
          correctCount={correctCount}
          totalQuestions={QUIZ_QUESTIONS}
          attempts={attempts}
          onBackHome={() => {
            window.location.href = "/";
          }}
        />
      </Layout>
    );

  return (
    <Layout>
      <Container maxWidth="sm" sx={{ mt: 12, mb: 8, position: "relative" }}>
        {/* Audio element - looped background music */}
        <audio ref={audioRef} src="/quiz.mp3" loop preload="auto" />

        <Typography
          variant="h4"
          color="success.main"
          align="center"
          gutterBottom
          mb={4}
          sx={{ fontWeight: "bold" }}
        >
          🧠 Insect Quiz
        </Typography>

        {/* Progress Bar */}
        <Box sx={{ mb: 3 }}>
          <LinearProgress
            variant="determinate"
            value={((current + (showCard ? 1 : 0)) / QUIZ_QUESTIONS) * 100}
            sx={{
              height: 10,
              borderRadius: 5,
              bgcolor: "grey.300",
              "& .MuiLinearProgress-bar": {
                bgcolor: "success.main",
              },
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mt={0.5}
          >
            Question {current + 1} / {QUIZ_QUESTIONS}
          </Typography>
        </Box>

        <AnimatePresence mode="wait">
          {!showCard ? (
            <motion.div
              key={`question-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <Paper
                elevation={6}
                sx={{ p: 6, pb: 8, borderRadius: 3, userSelect: "none" }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  mb={4}
                  sx={{ fontWeight: "600" }}
                >
                  {current + 1}. {question.question}
                </Typography>
                <Stack spacing={2}>
                  {question.options.map((option) => {
                    const isSelected = selected === option;
                    const isCorrect = option === question.answer;
                    return (
                      <Button
                        key={option}
                        variant={
                          isSelected
                            ? isCorrect
                              ? "contained"
                              : "outlined"
                            : "outlined"
                        }
                        color={
                          isSelected
                            ? isCorrect
                              ? "success"
                              : "error"
                            : "success"
                        }
                        onClick={() => handleAnswer(option)}
                        disabled={!!selected && !isWrong}
                        sx={{
                          textTransform: "none",
                          fontWeight: "600",
                          fontSize: "1.1rem",
                          py: 1.5,
                          borderWidth: 2,
                          transition: "all 0.3s",
                          "&:hover": {
                            scale: 1.05,
                            bgcolor: isSelected
                              ? isCorrect
                                ? "success.dark"
                                : "error.dark"
                              : "success.light",
                          },
                        }}
                      >
                        {option}
                      </Button>
                    );
                  })}
                </Stack>

                <AnimatePresence>
                  {isWrong && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="error"
                        mt={3}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                        }}
                      >
                        <Box component="span" sx={{ mr: 1, fontSize: 20 }}>
                          ✗
                        </Box>
                        Oops! That’s not quite right. Try again!
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Paper>
            </motion.div>
          ) : (
            <motion.div
              key="reward"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
            >
              <Paper
                elevation={6}
                sx={{
                  p: 4,
                  borderRadius: 3,
                  mt: 4,
                  textAlign: "center",
                  bgcolor: "background.paper",
                  userSelect: "none",
                }}
              >
                <Typography
                  variant="h5"
                  color="success.main"
                  gutterBottom
                  sx={{ fontWeight: "bold" }}
                >
                  ✅ Correct! You earned:
                </Typography>

                <Box my={3} display="flex" justifyContent="center">
                  <InsectCard insect={question.reward} />
                </Box>

                <Button
                  variant="contained"
                  color="success"
                  onClick={nextQuestion}
                  sx={{
                    mt: 2,
                    px: 5,
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    boxShadow: 4,
                    "&:hover": { boxShadow: 6 },
                  }}
                  autoFocus
                >
                  Next Question
                </Button>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mute toggle below quiz */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Tooltip title={isMuted ? "Unmute Music" : "Mute Music"}>
            <IconButton
              color="success"
              onClick={toggleMute}
              size="large"
              aria-label="Toggle background music mute"
            >
              {isMuted ? (
                <VolumeOff fontSize="inherit" />
              ) : (
                <VolumeUp fontSize="inherit" />
              )}
            </IconButton>
          </Tooltip>
          <Typography variant="body2" color="text.secondary" ml={1}>
            {isMuted ? "Music Off" : "Music On"}
          </Typography>
        </Box>
      </Container>
    </Layout>
  );
};

export default Quiz;

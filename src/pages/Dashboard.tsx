import { Avatar, Box, Button, Divider, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CardCarousel from "../components/CardCarousel";
import CardPullModal from "../components/CardPullModal";
import LoginAlert from "../components/LoginAlet";
import { useAuth } from "../contexts/AuthContext";
import { useAllUsers, useUserCards } from "../hooks";
import Layout from "../Layout";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const userCards = useUserCards(user?.uid);
  const allUsers = useAllUsers();
  const [modalOpen, setModalOpen] = useState(false);
  // const [userCollection, setUserCollection] = useState<InsectCardData[]>([]);

  const [localPoints, setLocalPoints] = useState(0);

  if (!user) return <LoginAlert />;

  // Find current user data with points and cards info

  // Update localPoints whenever allUsers or user changes
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const currentUserData = allUsers.find((u) => u.uid === user?.uid);
    setLocalPoints(currentUserData?.points || 0);
  }, [allUsers, user]);

  const handleNewCard = () => {
    // Deduct points locally by CARD_POINTS_AMOUNT (assuming 1 here)
    setLocalPoints((prevPoints) => prevPoints - 1);
  };

  const sortedUsers = [...allUsers].sort(
    (a, b) => (b.cards || 0) - (a.cards || 0)
  );
  const userIndex = sortedUsers.findIndex((u) => u.uid === user.uid);
  const rank = userIndex !== -1 ? userIndex + 1 : allUsers.length;

  return (
    <Layout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "90vh",
          bgcolor: "#f1f8e9",
          p: 4,
          pl: 6,
          borderRadius: 3,
        }}
      >
        {/* Greeting */}
        <Box mt={4} mb={3}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box display="flex" alignItems="center" gap={2} mb={1}>
              {user.photoURL && (
                <Avatar src={user.photoURL} alt={user.displayName} />
              )}
              <Typography
                variant="h4"
                fontWeight={700}
                color="success.main"
                gutterBottom
              >
                Welcome back, {user.displayName}! 🪲
              </Typography>
            </Box>
            <Typography variant="body1" color="text.secondary">
              Let’s see how your insect collection is growing!
            </Typography>
          </motion.div>
        </Box>

        <Divider sx={{ my: 4 }} />
        {/* Points and Rank */}
        <Typography
          variant="h5"
          fontWeight={700}
          color="success.main"
          gutterBottom
        >
          Your Progress
        </Typography>
        <Box display="flex" gap={4} alignItems="center" mt={2} mb={4}>
          <Typography variant="body1" fontWeight={600} color="text.primary">
            🏆 Points:{" "}
            <Box component="span" sx={{ color: "#388e3c", fontWeight: 700 }}>
              {localPoints}
            </Box>
          </Typography>
          <Typography
            variant="body1"
            fontWeight={600}
            color="text.primary"
            sx={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => navigate("/leaderboard")}
          >
            📊 Rank:{" "}
            <Box component="span" sx={{ color: "#1976d2", fontWeight: 700 }}>
              #{rank}
            </Box>{" "}
            of {allUsers.length}
          </Typography>

          <Typography variant="body1" fontWeight={600} color="text.primary">
            🐛 Cards:{" "}
            <Box component="span" sx={{ color: "#d32f2f", fontWeight: 700 }}>
              {userCards.length}
            </Box>
          </Typography>
        </Box>
        <Divider sx={{ my: 4 }} />

        {/* Card Showcase */}

        {/* Card Collection */}
        <Box mb={6}>
          <Typography
            variant="h6"
            color="primary"
            fontWeight={600}
            gutterBottom
          >
            Your Card Collection ({userCards.length})
          </Typography>

          {userCards.length === 0 ? (
            <Typography color="text.secondary">
              You haven’t earned any cards yet. Try a quiz or card pull!
            </Typography>
          ) : (
            <CardCarousel
              cards={userCards}
              onCardClick={(card) => console.log(card)}
            />
          )}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Card Showcase */}
        {/* Actions */}
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} gap={2}>
          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => navigate("/quiz")}
              size="large"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 5,
                py: 2,
                borderRadius: 3,
              }}
            >
              🧠 Take a Quiz
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => setModalOpen(true)}
              size="large"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 5,
                py: 2,
                borderRadius: 3,
                borderWidth: 2,
              }}
            >
              🎴 Pull a Card
            </Button>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }}>
            <Button
              variant="outlined"
              color="success"
              onClick={() => navigate("/leaderboard")}
              size="large"
              sx={{
                textTransform: "none",
                fontWeight: 600,
                px: 5,
                py: 2,
                borderRadius: 3,
                borderWidth: 2,
              }}
            >
              📊 View Leaderboard
            </Button>
          </motion.div>
        </Box>
      </Box>
      <CardPullModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onNewCard={handleNewCard}
      />
    </Layout>
  );
};

export default Dashboard;

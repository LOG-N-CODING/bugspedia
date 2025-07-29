import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import CardCarousel from "../components/CardCarousel";
import LoginAlert from "../components/LoginAlet";
import { useAuth } from "../contexts/AuthContext";
import { InsectCardData } from "../types/Insect";
import { db } from "../utils/firebase";

interface LeaderboardUser {
  uid: string;
  displayName: string;
  email: string;
  points: number;
  showcaseCards: InsectCardData[];
}

const Leaderboard: React.FC = () => {
  const { user, loading } = useAuth();
  const [users, setUsers] = useState<LeaderboardUser[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const allUsers = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          return {
            uid: doc.id,
            displayName: data.displayName || "Anonymous",
            email: data.email,
            points: data.points || 0,
            showcaseCards: data.showcaseCards || [],
          };
        })
        // Sort descending by number of cards collected
        .sort(
          (a, b) =>
            (b.showcaseCards?.length || 0) - (a.showcaseCards?.length || 0)
        );

      setUsers(allUsers);
    };

    fetchUsers();
  }, [user]);

  if (loading) {
    return (
      <Layout>
        <Typography variant="h6" align="center" mt={8}>
          Loading leaderboard...
        </Typography>
      </Layout>
    );
  }

  if (!user) {
    return <LoginAlert />;
  }

  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 0, mb: 6 }}>
        <Typography variant="h3" color="primary" gutterBottom>
          🏆 BugsPedia Leaderboard
        </Typography>

        <Typography variant="body1" color="text.secondary" paragraph>
          See how explorers rank by their insect collections and points!
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 2 }}>
          {users.length === 0 ? (
            <Typography>No users found.</Typography>
          ) : (
            users.map((userData, index) => (
              <Card
                key={userData.uid}
                elevation={4}
                sx={{
                  borderRadius: 3,
                  overflow: "hidden",
                  transition: "0.3s",

                  bgcolor: userData.uid === user.uid ? "#dcf2e1" : "#fff",
                  boxShadow:
                    userData.uid === user.uid ? "0 0 10px #92b098" : "",
                }}
              >
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: "success.main" }}>
                      {userData.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  }
                  title={
                    <Typography variant="h6" fontWeight={600}>
                      {userData.displayName}
                    </Typography>
                  }
                />
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 0.5,
                      mb: 2,
                      fontWeight: 600,
                      color: "text.primary",
                    }}
                  >
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: "#388e3c" }}
                    >
                      🏆 Points: {userData.points}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: "#1976d2" }}
                    >
                      📊 Rank: #{index + 1} of {users.length}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 700, color: "#d32f2f" }}
                    >
                      🐛 Cards: {userData.showcaseCards.length}
                    </Typography>
                  </Box>

                  <Typography variant="subtitle2" mb={1}>
                    🃏 Showcase Cards
                  </Typography>

                  {userData.showcaseCards.length > 0 ? (
                    <CardCarousel
                      cards={userData.showcaseCards.slice(0, 10)}
                      compact
                    />
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No showcase cards yet.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </Box>
      </Container>
    </Layout>
  );
};

export default Leaderboard;

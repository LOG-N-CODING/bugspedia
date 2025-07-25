// components/CardPullModal.tsx
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Fade,
  Modal,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { sampleInsects } from "../data/sampleInsects"; // fallback if needed
import { InsectCardData } from "../types/Insect";
import { db } from "../utils/firebase";

const CARD_POINTS_AMOUNT = 1;

interface CardPullModalProps {
  open: boolean;
  onClose: () => void;
  onNewCard: (card: InsectCardData) => void;
}

const CardPullModal: React.FC<CardPullModalProps> = ({
  open,
  onClose,
  onNewCard,
}) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [pulledCard, setPulledCard] = useState<InsectCardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [userPoints, setUserPoints] = useState<number>(0);

  const fetchUserPoints = async () => {
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    console.log("Fetching user points for UID:", userRef);
    const snapshot = await (
      await getDocs(collection(db, "users"))
    ).docs.find((doc) => doc.id === user.uid);
    if (snapshot) {
      setUserPoints(snapshot.data().points || 0);
    }
  };

  const fetchRandomCard = async (): Promise<InsectCardData> => {
    try {
      const cards = sampleInsects;
      const random = cards[Math.floor(Math.random() * cards.length)];
      return random;
    } catch (err) {
      console.error("Error fetching random card:", err);
      throw new Error("Failed to fetch card.");
    }
  };
  // Inside your CardPullModal component:
  const handlePullCard = async () => {
    if (!user) return;
    // if (userPoints < CARD_POINTS_AMOUNT) {
    //   setError("You don’t have enough points to pull a card.");
    //   return;
    // }

    setLoading(true);
    setError(null);

    try {
      const card = await fetchRandomCard();

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        points: increment(-CARD_POINTS_AMOUNT),
        cards: increment(1),
        showcaseCards: arrayUnion(card),
      });

      setPulledCard(card);
      onNewCard(card);
      setUserPoints((prev) => prev - CARD_POINTS_AMOUNT);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  };

  useEffect(() => {
    if (open) {
      fetchUserPoints();
      setPulledCard(null);
      setError(null);
      // body 스크롤 허용
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflowY: 'auto',
        maxHeight: '100vh',
      }}
    >
      <Fade in={open}>
        <Box
          sx={{
            margin: '5% auto 1%',
            width: '90vw',
            maxWidth: 400,
            bgcolor: "background.paper",
            p: 4,
            mx: "auto",
            borderRadius: 3,
            boxShadow: 6,
            textAlign: "center",
            minHeight: 200,
            maxHeight: '80%',
            overflowY: 'auto',
            display: "flex",
            flexDirection: "column",
            zIndex: 1301,
            position: 'relative',
          }}
        >
          {/* 닫기(X) 버튼 */}
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
              zIndex: 2,
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h5" mb={2} mt={4}>
            📇 Pull a Random Insect Card
          </Typography>

          {loading ? (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: 200,
                width: "100%",
              }}
            >
              <CircularProgress sx={{ mt: 6, mb: 2 }} />
              <Typography variant="body2" mt={2}>
                Pulling a card...
              </Typography>
            </Box>
          ) : pulledCard ? (
            <Card elevation={4} sx={{ my: 2, borderRadius: 3 }}>
              <CardMedia
                component="img"
                height="200"
                image={pulledCard.image}
                alt={pulledCard.name}
              />
              <CardContent>
                <Typography variant="h6">{pulledCard.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {pulledCard.description}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Button
              variant="contained"
              color="success"
              onClick={handlePullCard}
              disabled={loading}
              sx={{
                mt: 8,
              }}
            >
              Pull Card (1 Point)
            </Button>
          )}

          <Button
            variant="contained"
            color="primary"
            onClick={onClose}
            sx={{ mt: 2 }}
          >
            OK
          </Button>

          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </Box>
      </Fade>
    </Modal>
  );
};

export default CardPullModal;

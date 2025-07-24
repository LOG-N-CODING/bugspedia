import { Box, Tooltip, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface CardData {
  name: string;
  image: string;
  description?: string;
}

interface CardCarouselProps {
  cards: CardData[];
  onCardClick?: (card: CardData) => void;
  compact?: boolean;
}

const CardCarousel = ({
  cards,
  compact = false,
  onCardClick,
}: CardCarouselProps) => {
  const [flippedCard, setFlippedCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dragWidth, setDragWidth] = useState(0);

  const handleFlip = (cardId: string) => {
    setFlippedCard((prev) => (prev === cardId ? null : cardId));
  };

  useEffect(() => {
    if (containerRef.current) {
      const scrollWidth = containerRef.current.scrollWidth;
      const offsetWidth = containerRef.current.offsetWidth;
      setDragWidth(scrollWidth - offsetWidth);
    }
  }, [cards]);

  return (
    <Box
      ref={containerRef}
      sx={{
        width: "100%",
        overflow: "hidden", // Hide overflow to enable drag reveal
        position: "relative",
        py: 2,
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -dragWidth, right: 0 }}
        style={{
          display: "flex",
          gap: 16,
          cursor: "grab",
        }}
        whileTap={{ cursor: "grabbing" }}
      >
        {cards.map((card, index) => {
          const isFlipped = flippedCard === card.name;

          return (
            <motion.div
              key={index}
              onClick={() => {
                handleFlip(card.name);
                onCardClick?.(card);
              }}
              style={{
                width: compact ? 100 : 160,
                height: compact ? 120 : 200,
                flex: "0 0 auto",
                position: "relative",
                transformStyle: "preserve-3d",
                transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.6s",
                perspective: 1000,
              }}
            >
              {/* Front */}
              <motion.div
                style={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  backfaceVisibility: "hidden",
                }}
                whileHover={{ scale: 1.05 }}
              >
                <Tooltip title={card.name}>
                  <Box
                    component="img"
                    src={card.image}
                    alt={card.name}
                    sx={{
                      width: "100%",
                      height: "100%",
                      borderRadius: 2,
                      objectFit: "cover",
                      boxShadow: 3,
                    }}
                  />
                </Tooltip>
              </motion.div>

              {/* Back */}
              <Box
                sx={{
                  position: "absolute",
                  width: "100%",
                  height: "100%",
                  bgcolor: "background.paper",
                  color: "text.primary",
                  borderRadius: 2,
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  px: 1,
                  boxShadow: 3,
                  textAlign: "center",
                }}
              >
                <Typography variant="caption" fontWeight="bold" gutterBottom>
                  {card.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.description || "No description available."}
                </Typography>
              </Box>
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default CardCarousel;

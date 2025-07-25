import { Box, Tooltip, Typography, IconButton } from "@mui/material";
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
  onDeleteCard?: (card: CardData) => void;
  compact?: boolean;
}

const CardCarousel = ({
  cards,
  compact = false,
  onCardClick,
  onDeleteCard,
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
        overflowX: "auto", // 스크롤바 표시
        overflowY: "hidden",
        position: "relative",
        py: 2,
        "&::-webkit-scrollbar": {
          height: 8,
          background: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "linear-gradient(to right,rgb(129, 172, 131),rgb(51, 108, 58))",
          borderRadius: 4,
        },
        "&::-webkit-scrollbar-track": {
          background: "transparent",
        },
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
                  {/* Front */}
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
                      pointerEvents: "none",
                      userSelect: "none",
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
                  justifyContent: compact ? "start" : "center",
                  boxShadow: 3,
                  textAlign: "center",
                  overflow: "hidden",
                }}
                >

                {/* title */}
                {compact && (
                  <Typography variant="caption" fontWeight="bold" px={"1px"} pt={2} lineHeight={1.2} gutterBottom>
                  {card.name}
                  </Typography>
                )}
                {compact || (
                  <Typography variant="caption" fontWeight="bold">
                  {card.name}
                  </Typography>
                )}

                {/* secondary */}
                <Typography variant="caption" color="text.secondary" lineHeight={0.9} px={1} pb={1} maxHeight={compact ? "57px" : "50%"} overflow="hidden">
                  {card.description || "No description available."}
                </Typography>
                {onDeleteCard && (
                  <IconButton
                  size="small"
                  color="error"
                  sx={{ mt: 1 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteCard(card);
                  }}
                  >
                  🗑️
                  </IconButton>
                )}
                </Box>
            </motion.div>
          );
        })}
      </motion.div>
    </Box>
  );
};

export default CardCarousel;

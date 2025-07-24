import { Box } from "@mui/material";
import { motion } from "framer-motion";
// components/FlippableCard.tsx
import React, { useState } from "react";

const FlippableCard: React.FC<{
  front: React.ReactNode;
  back: React.ReactNode;
}> = ({ front, back }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <Box
      onClick={() => setFlipped(!flipped)}
      sx={{
        width: 100,
        height: 100,
        perspective: 1000,
        cursor: "pointer",
      }}
    >
      <motion.div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          transformStyle: "preserve-3d",
        }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
      >
        <Box
          sx={{
            backfaceVisibility: "hidden",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {front}
        </Box>
        <Box
          sx={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            position: "absolute",
            width: "100%",
            height: "100%",
          }}
        >
          {back}
        </Box>
      </motion.div>
    </Box>
  );
};

export default FlippableCard;

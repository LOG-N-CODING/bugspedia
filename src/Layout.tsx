// components/Layout.tsx
import { Container } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";
import "./style.css";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "relative",
        overflow: "hidden",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        // minHeight: "100vh",
      }}
    >
      {/* Background Layer */}
      {/* <div
        className="zoom-background"
        style={{
          background: `linear-gradient(to right, rgba(234, 240, 234, 0.66), rgb(200, 218, 195)), url('./bg.png')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundBlendMode: "overlay",
          filter: "blur(6.5px)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          animation: "zoomInOut 10s ease-in-out infinite",
        }}
      /> */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
        {children}
      </Container>
    </motion.div>
  );
};

export default Layout;

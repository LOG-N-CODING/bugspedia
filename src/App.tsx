import { AnimatePresence } from "framer-motion";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import { ThemeProvider } from "@emotion/react";
import FloatingEffectBackground from "./components/FloatingEffectBackground";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./contexts/AuthContext";
import Dashboard from "./pages/Dashboard";
import Encyclopedia from "./pages/Encyclopedia";
import Leaderboard from "./pages/Leaderboard";
import Login from "./pages/Login";
import Quiz from "./pages/Quiz";
import QuizStart from "./pages/QuizStart";
import Signup from "./pages/Signup";
import { theme } from "./theme";
import QuizComplete from "./components/QuizComplete";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <FloatingEffectBackground />
      <Router>
        <AuthProvider>
          <Navbar />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/quiz" element={<QuizStart />} />
              <Route path="/quiz/play" element={<Quiz />} />
              <Route path="/quiz/complete" element={<QuizComplete />} />
              <Route path="/encyclopedia" element={<Encyclopedia />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </AnimatePresence>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;

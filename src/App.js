import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useEffect, useState } from "react";
import AboutPage from "./pages/AboutPage";
import InstructionsPage from "./pages/InstructionsPage";
import PrivacyPage from "./pages/PrivacyPage";
import ContactPage from "./pages/ContactPage";
import SupportPage from "./pages/SupportPage";
import HomePage from "./pages/HomePage";
import OnboardingPage from "./pages/OnboardingPage";
import Layout from "./components/Layout";
import { saveOnboardingState } from "./utils/storage";

const App = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Detect bot on initial load
  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const botKeywords = [
      "googlebot",
      "bingbot",
      "yandex",
      "duckduckbot",
      "baiduspider",
      "slurp",
      "adsbot-google",
    ];
    const botDetected = botKeywords.some((bot) => userAgent.includes(bot));

    const hasSeen = localStorage.getItem("hasSeenOnboarding");
    if (!hasSeen && !botDetected) {
      setShowOnboarding(true);
    }
  }, []);

  const handleOnboardingComplete = () => {
    saveOnboardingState();
    setShowOnboarding(false);
  };

  return (
    <Router>
      {showOnboarding ? (
        <OnboardingPage onComplete={handleOnboardingComplete} />
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/instructions" element={<InstructionsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      )}
    </Router>
  );
};

export default App;

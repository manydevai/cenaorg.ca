import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { BlackConsciousnessGallery } from "./pages/BlackConsciousnessGallery.tsx";
import { PastEventsBlackConsciousness } from "./pages/PastEventsBlackConsciousness.tsx";
import { PastEventConscienciaNegra } from "./pages/PastEventConscienciaNegra.tsx";
import { LanguageProvider } from "./contexts/LanguageContext.tsx";
import "./index.css";

import { BlogPage } from "./pages/BlogPage.tsx";
import { PrivacyPage } from "./pages/PrivacyPage.tsx";
import { DataProtectionPage } from "./pages/DataProtectionPage.tsx";
import { TermsPage } from "./pages/TermsPage.tsx";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <LanguageProvider>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/events/black-consciousness-day" element={<PastEventsBlackConsciousness />} />
        <Route path="/events/consciencia-negra-cena-caf" element={<PastEventConscienciaNegra />} />
        <Route path="/gallery/black-consciousness-day" element={<BlackConsciousnessGallery />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/data-protection" element={<DataProtectionPage />} />
        <Route path="/terms" element={<TermsPage />} />
      </Routes>
    </LanguageProvider>
  </BrowserRouter>
);
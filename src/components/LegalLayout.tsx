import { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Toaster } from "./ui/sonner";
import { CookieBanner } from "./CookieBanner";

interface LegalLayoutProps {
  children: ReactNode;
}

export function LegalLayout({ children }: LegalLayoutProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden relative flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-24">
        {children}
      </main>
      <CookieBanner />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}

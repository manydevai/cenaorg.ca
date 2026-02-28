import { ReactNode } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Toaster } from '../components/ui/sonner';

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="min-h-screen bg-white">
            <Header />
            <main>
                {children}
            </main>
            <Footer />
            <Toaster position="top-right" />
        </div>
    );
}

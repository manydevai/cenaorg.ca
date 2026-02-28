import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // If there's a hash, scroll to that element
            // Delay to allow page to fully render before scrolling
            setTimeout(() => {
                const id = hash.replace('#', '');
                const element = document.getElementById(id);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        } else {
            // Otherwise scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }, [pathname, hash]);

    return null;
}

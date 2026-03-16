import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
    threshold?: number;
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useInView({
    threshold = 0.15,
    rootMargin = '0px',
    triggerOnce = true,
}: UseInViewOptions = {}) {
    const ref = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (triggerOnce) observer.unobserve(element);
                } else if (!triggerOnce) {
                    setIsInView(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);
        return () => observer.unobserve(element);
    }, [threshold, rootMargin, triggerOnce]);

    return { ref, isInView };
}

/**
 * Hook for observing multiple children inside a container.
 * Each child with `data-inview` attribute will get `data-inview="true"` when visible.
 * Staggered animation delay is applied automatically.
 */
export function useStaggeredInView({
    threshold = 0.1,
    rootMargin = '50px 0px',
    staggerDelay = 150,
}: {
    threshold?: number;
    rootMargin?: string;
    staggerDelay?: number;
} = {}) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const items = container.querySelectorAll('[data-inview]');
        if (!items.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const el = entry.target as HTMLElement;
                        const index = parseInt(el.dataset.inviewIndex || '0', 10);
                        // Stagger the activation
                        setTimeout(() => {
                            el.setAttribute('data-inview', 'true');
                        }, index * staggerDelay);
                        observer.unobserve(el);
                    }
                });
            },
            { threshold, rootMargin }
        );

        items.forEach((item, index) => {
            (item as HTMLElement).dataset.inviewIndex = String(index);
            observer.observe(item);
        });

        return () => observer.disconnect();
    }, [threshold, rootMargin, staggerDelay]);

    return containerRef;
}

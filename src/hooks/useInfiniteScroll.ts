import { useState, useEffect, useCallback } from 'react';

interface UseInfiniteScrollOptions {
    threshold?: number;
    initialPage?: number;
}

export const useInfiniteScroll = (hasMore: boolean, options: UseInfiniteScrollOptions = {}) => {
    const { threshold = 500, initialPage = 1 } = options;
    const [page, setPage] = useState(initialPage);

    const handleScroll = useCallback(() => {
        if (
            window.innerHeight + window.scrollY >= document.body.offsetHeight - threshold &&
            hasMore
        ) {
            setPage((prev) => prev + 1);
        }
    }, [hasMore, threshold]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return { page, setPage };
}; 
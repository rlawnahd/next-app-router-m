'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';

export default function TestInfiniteScroll() {
    const fetchPosts = async ({ pageParam = 1 }) => {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${pageParam}&_limit=15`);
        const data = await response.json();
        return {
            data,
            nextPage: data.length === 15 ? pageParam + 1 : null,
        };
    };
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
        initialPageParam: 1,

        getNextPageParam: (lastPage) => lastPage.nextPage,
    });
    const nextFetchTargetRef = React.useRef<HTMLDivElement>(null);
    const isObserving = React.useRef(false);
    useEffect(() => {
        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5,
        };
        const fetchCallback: IntersectionObserverCallback = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && hasNextPage && !isFetching && !isObserving.current) {
                    isObserving.current = true;
                    fetchNextPage?.().finally(() => {
                        isObserving.current = false;
                    });
                    observer.unobserve(entry.target);
                }
            });
        };
        const observer = new IntersectionObserver(fetchCallback, options);
        const currentRef = nextFetchTargetRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [hasNextPage, fetchNextPage, isFetching]);
    return (
        <div>
            <div>
                {data?.pages.map((page, i) => (
                    <div key={i}>
                        {page.data.map((post: any) => (
                            <div key={post.id} className="border border-cs-border-default p-4">
                                <h2>{post.title}</h2>
                                <p>{post.body}</p>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            {hasNextPage ? ( // isLoading이 false이면서 hasNextPage가 true일 시에만 보이도록
                <div className="h-6" ref={nextFetchTargetRef}>
                    • • •
                </div> // API 호출 영역
            ) : null}
            <button onClick={() => fetchNextPage()} disabled={!hasNextPage || isFetchingNextPage}>
                {isFetchingNextPage ? 'Loading more...' : hasNextPage ? 'Load More' : 'Nothing More To Load'}
            </button>
        </div>
    );
}

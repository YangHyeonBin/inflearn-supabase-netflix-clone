"use client";

import { useGetAllMovies, useGetMovies } from "services/useMovieQueries";
import MovieCard from "./MovieCard";
import { useSearch } from "contexts/SearchContext";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MovieCardList() {
    const { search } = useSearch();
    // const { data, isLoading } = useGetAllMovies({ search: search });

    // data - pageParam: 현재 어떤 페이지 보고 있는지 정보, pages: 전체 페이지 데이터
    const { data, isFetching, isFetchingNextPage, fetchNextPage, hasNextPage } =
        useGetMovies({ search });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage]);

    return (
        <div className="w-full h-full relative">
            {/* 로딩 인디케이터 */}
            {isFetching && !isFetchingNextPage && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <i className="fa-solid fa-spinner animate-spin text-3xl"></i>
                </div>
            )}

            {data && (
                <div className="w-full h-full grid md:grid-cols-4 grid-cols-3 gap-1">
                    {/* 배열(전체 무비 데이터) 속 배열(페이지별 무비 데이터)이므로, 평탄화 */}
                    {data?.pages?.map((page, pageIndex) =>
                        page.data
                            ?.flat()
                            ?.map((movie) => (
                                <MovieCard
                                    key={`page-${pageIndex}-movie-${movie.id}`}
                                    movie={movie}
                                />
                            ))
                    )}
                    {/* IntersectionObserver - 무한스크롤 구현을 위해 */}
                    <div
                        ref={ref}
                        className="h-10 col-span-full flex justify-center items-center">
                        {isFetchingNextPage && (
                            <i className="fa-solid fa-spinner animate-spin text-xl"></i>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

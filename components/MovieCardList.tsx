"use client";

import {
    useGetFavoritedMovies,
    useGetNonFavoritedMovies,
} from "services/useMovieQueries";
import MovieCard from "./MovieCard";
import { useSearch } from "contexts/SearchContext";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

export default function MovieCardList() {
    const { search } = useSearch();

    const { data: favoritedMovies, isLoading } = useGetFavoritedMovies({
        search,
    });

    // data - pageParam: 현재 어떤 페이지 보고 있는지 정보, pages: 전체 페이지 데이터
    const {
        data: nonFavoritedMovies,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useGetNonFavoritedMovies({ search, page: 1, pageSize: 12 });

    const { ref, inView } = useInView({
        threshold: 0,
    });

    useEffect(() => {
        if (inView && hasNextPage && !isFetching && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [inView, hasNextPage, fetchNextPage, isFetching, isFetchingNextPage]);

    return (
        <div className="w-full h-full relative p-4">
            {/* 로딩 인디케이터 */}
            {(isFetching || isLoading) && !isFetchingNextPage && (
                <div className="fixed inset-0 flex items-center justify-center z-10">
                    <i className="fa-solid fa-spinner animate-spin text-3xl"></i>
                </div>
            )}

            {/* 데이터가 없을 때 표시 */}
            {nonFavoritedMovies && // 쿼리 결과가 있고
                !isLoading &&
                !isFetching &&
                nonFavoritedMovies?.pages[0]?.data?.length === 0 && // 데이터가 없을 때
                (!favoritedMovies || favoritedMovies.length === 0) && (
                    <div className="flex flex-col items-center justify-center h-96">
                        <i className="fa-solid fa-film text-6xl text-gray-300 mb-4"></i>
                        <p className="text-xl text-gray-500">
                            검색 결과가 없습니다
                        </p>
                        <p className="text-sm text-gray-400 mt-2">
                            다른 검색어로 시도해보세요
                        </p>
                    </div>
                )}

            {/* 찜한 목록, 가로스크롤 */}
            {favoritedMovies && favoritedMovies?.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2">찜한 영화</h2>
                    <div className="h-72 flex flex-row gap-1 overflow-x-auto">
                        {favoritedMovies?.map((movie) => (
                            <MovieCard
                                key={`movie-${movie.id}`}
                                movie={movie}
                                layout="row"
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* 찜하지 않은 전체 영화 목록, 그리드, 세로스크롤 */}
            {nonFavoritedMovies && (
                <div>
                    {favoritedMovies &&
                        favoritedMovies?.length > 0 &&
                        nonFavoritedMovies?.pages?.length > 0 && (
                            <h2 className="text-2xl font-bold mb-2">
                                전체 영화
                            </h2>
                        )}
                    <div className="w-full h-full grid md:grid-cols-4 grid-cols-3 gap-1">
                        {/* 배열(전체 무비 데이터) 속 배열(페이지별 무비 데이터)이므로, 평탄화 */}
                        {nonFavoritedMovies?.pages?.map((page, pageIndex) =>
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
                        {/* 무한 스크롤 감지 요소 - 별도로 배치하여 정확히 감지되도록 함 */}
                        <div ref={ref} className="py-4 my-2 w-full"></div>
                    </div>
                </div>
            )}
        </div>
    );
}

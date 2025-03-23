"use client";

import Link from "next/link";
import { Movie } from "databaseTypes";
import { useToggleFavorite } from "services/useMovieQueries";

export default function MovieCard({
    movie,
    layout = "grid",
}: {
    movie: Movie;
    layout?: "grid" | "row";
}) {
    const handleFavoriteClick = useToggleFavorite();

    // 레이아웃에 따른 클래스 설정
    const containerClass =
        layout === "row"
            ? "flex-shrink-0 w-48" // 가로 스크롤용 고정 너비
            : "col-span-1 w-full"; // 그리드용 반응형 너비

    return (
        // 상위인 MovieCardList의 grid 관련 속성
        <div className={`relative ${containerClass}`}>
            <img
                className="aspect-[2/3] overflow-hidden"
                src={movie.image_url}
                alt={movie.title}
            />

            {/* dim */}
            <Link href={`/movies/${movie.id}`}>
                <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center">{movie.title}</p>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleFavoriteClick.mutate({
                                movieId: movie.id,
                                wasFavorited: movie.favorited_date !== null,
                            });
                        }}
                        className="absolute top-2 right-2 z-20 bg-black bg-opacity-50 rounded-full px-2 py-1 transition-all hover:bg-opacity-70"
                        aria-label={
                            movie.favorited_date !== null
                                ? "찜 취소하기"
                                : "찜하기"
                        }>
                        {movie.favorited_date !== null ? (
                            <i className="fa-solid fa-heart text-red-500"></i>
                        ) : (
                            <i className="fa-regular fa-heart text-white"></i>
                        )}
                    </button>
                </div>
            </Link>
        </div>
    );
}

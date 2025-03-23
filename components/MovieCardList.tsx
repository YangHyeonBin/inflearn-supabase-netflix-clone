"use client";

import { useGetAllMovies } from "services/useMovieQueries";
import MovieCard from "./MovieCard";
import { useSearch } from "contexts/SearchContext";

export default function MovieCardList() {
    const { search } = useSearch();
    const { data, isLoading } = useGetAllMovies({ search: search });

    if (isLoading) {
        return (
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                <i className="fa-solid fa-spinner animate-spin text-3xl"></i>
            </div>
        );
    }

    return (
        <div className="w-full h-full grid md:grid-cols-4 grid-cols-3 gap-1">
            {data?.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
            ))}
        </div>
    );
}

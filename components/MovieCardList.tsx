"use client";

import MovieCard from "./MovieCard";

export default function MovieCardList() {
    return (
        <div className="w-full h-full grid md:grid-cols-4 grid-cols-3 gap-1">
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
        </div>
    );
}

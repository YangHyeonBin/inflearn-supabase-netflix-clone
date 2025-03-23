"use client";

import Link from "next/link";
import { Movie } from "databaseTypes";

export default function MovieCard({ movie }: { movie: Movie }) {
    return (
        // 상위인 MovieCardList의 grid 관련 속성
        <div className="col-span-1 relative">
            <img className="w-full" src={movie.image_url} alt={movie.title} />

            {/* dim */}
            <Link href={`/movies/${movie.id}`}>
                <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center">{movie.title}</p>
                </div>
            </Link>
        </div>
    );
}

"use client";

import { Movie } from "databaseTypes";

export default function Ui({
    movie,
}: {
    movie: Movie;
}) {
    // if (isLoading) {
    //     return (
    //         <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
    //             <i className="fa-solid fa-spinner animate-spin text-3xl"></i>
    //         </div>
    //     );
    // }

    return (
        // 기본: flex-col, md 이상일 때: flex-row
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-1 ">
            <img className="w-1/3" src={movie.image_url} alt={movie.title} />
            <div className="md:w-2/3 w-full flex flex-col items-center md:items-start md:py-2 gap-2">
                <h1 className="text-2xl font-bold">{movie?.title}</h1>
                <p className="text-lg font-medium">{movie?.overview}</p>
                <div className="text-lg font-bold flex items-center">
                    <i className="fa-solid fa-star mr-2"></i>
                    Vote Average: {movie?.vote_average}
                </div>
                <div className="text-lg font-bold">
                    Popularity: {movie.popularity}
                </div>
                <div className="text-lg font-bold">
                    Release Date: {movie.release_date}
                </div>
            </div>
        </div>
    );
}

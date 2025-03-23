import { useQuery } from "@tanstack/react-query";
import { getAllMovies, getMovieById } from "actions/movieActions";

export function useGetAllMovies({ search }: { search: string }) {
    return useQuery({
        queryKey: ["movies", search],
        queryFn: () => getAllMovies({ search }),
    });
}

export function useGetMovieById({ movieId }: { movieId: number }) {
    return useQuery({
        queryKey: ["movie", movieId],
        queryFn: () => getMovieById({ movieId }),
    });
}

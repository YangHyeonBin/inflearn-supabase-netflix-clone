import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getAllMovies, getMovieById, getMovies } from "actions/movieActions";

export function useGetAllMovies({ search }: { search: string }) {
    return useQuery({
        queryKey: ["movies", search],
        queryFn: () => getAllMovies({ search }),
    });
}

export function useGetMovies({ search }: { search: string }) {
    return useInfiniteQuery({
        initialPageParam: 1, // 데이터를 불러오는 단위마다 하나의 페이지로 간주, 첫 페이지를 1로 하겠다는 의미
        queryKey: ["movies", search],
        queryFn: ({ pageParam }) =>
            getMovies({ search, page: pageParam, pageSize: 12 }),
        // pageSize는 각 페이지의 사이즈
        getNextPageParam: (lastPage) =>
            lastPage?.page ? lastPage.page + 1 : null, // 받은 데이터의 page 값이 존재하면 그 다음 페이지 값을 리턴, 뭔가 잘못됐으면 null을 리턴
    });
}

export function useGetMovieById({ movieId }: { movieId: number }) {
    return useQuery({
        queryKey: ["movie", movieId],
        queryFn: () => getMovieById({ movieId }),
    });
}

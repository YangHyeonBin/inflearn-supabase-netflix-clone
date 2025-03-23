import {
    useInfiniteQuery,
    useMutation,
    useQuery,
    useQueryClient,
} from "@tanstack/react-query";
import {
    getAllMovies,
    getFavoritedMovies,
    getMovieById,
    getMovies,
    getNonFavoritedMovies,
    toggleFavorite,
} from "actions/movieActions";

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

export function useGetFavoritedMovies({ search }: { search: string }) {
    return useQuery({
        queryKey: ["movies", "favorited", search],
        queryFn: () => getFavoritedMovies({ search }),
    });
}

export function useGetNonFavoritedMovies({
    search,
    page,
    pageSize,
}: {
    search: string;
    page: number;
    pageSize: number;
}) {
    return useInfiniteQuery({
        initialPageParam: 1,
        queryKey: ["movies", "non-favorited", search],
        queryFn: ({ pageParam }) =>
            getNonFavoritedMovies({ search, page: pageParam, pageSize }),
        getNextPageParam: (lastPage) => {
            // lastPage?.page ? lastPage.page + 1 : null, // 검색어 입력 시 무한으로 다시 호출하는 버그

            // 데이터가 없으면 undefined를 반환하여 hasNextPage를 false로 설정
            if (!lastPage.data || lastPage.data.length === 0) {
                return undefined;
            }
            // 마지막 페이지의 데이터 개수가 pageSize보다 작으면 undefined를 반환
            if (lastPage.data.length < pageSize) {
                return undefined;
            }
            return lastPage.page + 1;
        },
    });
}

export function useGetMovieById({ movieId }: { movieId: number }) {
    return useQuery({
        queryKey: ["movie", movieId],
        queryFn: () => getMovieById({ movieId }),
    });
}

/**
 * Toggles the favorite status of a movie
 * @param {number} movieId - ID of the movie to toggle favorite status
 * @param {boolean} wasFavorited - Current favorite status of the movie, before toggling
 * @returns {Promise<Movie>} - Updated movie data
 */
export function useToggleFavorite() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            movieId,
            wasFavorited,
        }: {
            movieId: number;
            wasFavorited: boolean;
        }) => toggleFavorite({ movieId, wasFavorited }),
        onSuccess: (updatedMovie, { movieId }) => {
            // 개별 영화 캐시 업데이트
            if (updatedMovie) {
                queryClient.invalidateQueries({ queryKey: ["movie", movieId] });
            }

            // 영화 목록 캐시 무효화
            queryClient.invalidateQueries({ queryKey: ["movies"] });
        },
        onError: (error, { movieId }) => {
            console.error(
                "Failed to toggle favorite for movie",
                movieId,
                error
            );
        },
    });
}

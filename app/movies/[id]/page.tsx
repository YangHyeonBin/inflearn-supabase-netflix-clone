import { useGetMovieById } from "services/useMovieQueries";
import Ui from "./Ui";
import { getMovieById } from "actions/movieActions";

export default async function MovieDetail({
    params,
}: {
    params: { id: string };
}) {
    // params를 사용하기 전에 await으로 처리
    const resolvedParams = await params;

    // 메타 데이터 표시를 위해 server component에서 데이터를 가져옴
    // 다만, server component라 react query 사용 불가
    // const {
    //     data: movie,
    //     isLoading,
    //     error,
    // } = useGetMovieById({
    //     movieId: Number(resolvedParams.id),
    // });
    const movie = await getMovieById({
        movieId: Number(resolvedParams.id),
    });

    if (!movie) {
        return (
            <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                <p className="text-red-500">존재하지 않는 영화입니다.</p>
            </div>
        );
    }

    return (
        <main className="absolute top-0 bottom-0 left-0 right-0 flex items-center bg-blue-50">
            <Ui movie={movie} />
        </main>
    );
}

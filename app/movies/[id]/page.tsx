import Ui from "./Ui";
import { getMovieById } from "actions/movieActions";

// 각 영화 페이지에 맞는 동적인 메타데이터를 생성
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // params를 사용하기 전에 await으로 처리
    const resolvedParams = await params;

    // 메타 데이터 표시를 위해 server component에서 데이터를 가져옴
    // 다만, server component라 react query 사용 불가
    // const {
    const movie = await getMovieById({
        movieId: Number(resolvedParams.id),
    });

    if (!movie) {
        return {
            title: "",
            description: "",
            openGraph: {
                images: [""],
            },
        };
    }

    return {
        title: movie?.title || "",
        description: movie?.overview || "",

        // 메타데이터를 위한 이미지 URL - og이미지. 사이트 url 공유 시 보이는 이미지임
        openGraph: {
            images: [movie?.image_url || ""],
        },
    };
}

export default async function MovieDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    // params를 사용하기 전에 await으로 처리
    const resolvedParams = await params;

    // 메타 데이터 표시를 위해 server component에서 데이터를 가져옴
    // 다만, server component라 react query 사용 불가
    // const {
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
        <main className="h-screen w-full flex items-center justify-center bg-blue-50">
            <div className="container mx-auto px-4 max-w-6xl">
                <Ui movie={movie} />
            </div>
        </main>
    );
}

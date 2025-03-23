import Ui from "./Ui";

export default async function MovieDetail({
    params,
}: {
    params: { id: string };
}) {
    // params를 사용하기 전에 await으로 처리
    const resolvedParams = await params;

    return (
        <main className="absolute top-0 bottom-0 left-0 right-0 flex items-center bg-blue-50">
            <Ui movieId={resolvedParams.id} />
        </main>
    );
}

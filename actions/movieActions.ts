"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error: unknown) {
    if (error instanceof Error) {
        console.error(error);
        throw error;
    }
}

export async function getAllMovies({ search = "" }: { search: string }) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from("movie")
        .select()
        .like("title", `%${search}%`);

    handleError(error);

    return data;
}

export async function getMovies({
    search = "",
    page = 1,
    pageSize = 12,
}: {
    search: string;
    page: number;
    pageSize: number;
}) {
    const supabase = await createServerSupabaseClient();

    const { data, count, error } = await supabase
        // count: range와 관계 없이, 가져와야할 "전체" 데이터의 수
        .from("movie")
        .select()
        .like("title", `%${search}%`)
        .range((page - 1) * pageSize, page * pageSize - 1); // 페이징 처리. 어디서 시작해 어디서 끝날지를 전달

    handleError(error);

    const hasNextPage = count && count > page * pageSize;

    return {
        data,
        page,
        pageSize,
        hasNextPage,
    };
}

export async function getMovieById({ movieId }: { movieId: number }) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from("movie")
        .select()
        .eq("id", movieId)
        .maybeSingle(); // 하나일 수도 있으나, null일수도 있다!

    handleError(error);

    return data;
}

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

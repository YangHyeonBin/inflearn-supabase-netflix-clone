import { createBrowserSupabaseClient } from "utils/supabase/client";

export default function movieServices() {
    const supabase = createBrowserSupabaseClient();

    async function getAllMovies({ search }: { search: string }) {
        const { data, error } = await supabase
            .from("movie")
            .select()
            .like("title", `%${search}%`);

        if (error) {
            throw error;
        }

        return data;
    }

    async function getMovieById(movieId: string) {
        const { data, error } = await supabase
            .from("movie")
            .select()
            .eq("id", movieId)
            .single();

        if (error) {
            throw error;
        }

        return data;
    }

    return {
        getAllMovies,
        getMovieById,
    };
}

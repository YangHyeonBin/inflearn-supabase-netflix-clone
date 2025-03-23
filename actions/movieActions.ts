"use server";

import { title } from "process";
import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error: unknown) {
    if (error instanceof Error) {
        console.error(error);
        throw error;
    }
}

// 전체 영화 조회
export async function getAllMovies({ search = "" }: { search: string }) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from("movie")
        .select()
        .like("title", `%${search}%`);

    handleError(error);

    return data;
}

// 전체 영화 페이징 처리하여 조회 (무한스크롤 사용)
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
        // 소문자, 대문자 구분 없이
        .like("title", `%${search}%`)
        .order("release_date", { ascending: false })
        .order("id", { ascending: true }) // 고유한 ID를 보조 정렬 키로 추가
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

// 찜한 영화만 조회
export async function getFavoritedMovies({ search = "" }: { search: string }) {
    const supabase = await createServerSupabaseClient();

    const { data, error } = await supabase
        .from("movie")
        .select()
        .not("favorited_date", "is", null)
        // .like("title", `%${search}%`)
        .ilike("title", `%${search.trim().replace(/\s+/g, "%")}%`) // 대소문자 구분 X
        .order("favorited_date", { ascending: false })
        .order("id", { ascending: true });

    handleError(error);

    return data;
}

// 찜하지 않은 영화 페이징 처리하여 조회 (무한스크롤 사용)
export async function getNonFavoritedMovies({
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
        .from("movie")
        .select()
        .is("favorited_date", null)
        // .like("title", `%${search}%`)
        .ilike("title", `%${search.trim().replace(/\s+/g, "%")}%`) // 대소문자 구분 X
        .order("release_date", { ascending: false })
        .order("id", { ascending: true })
        .range((page - 1) * pageSize, page * pageSize - 1);

    handleError(error);

    const hasNextPage = count && count > page * pageSize;

    return {
        data,
        page,
        pageSize,
        hasNextPage,
    };
}

// ID를 이용해 개별 영화 조회
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

/**
 * Toggles the favorite status of a movie
 * @param {number} movieId - ID of the movie to toggle favorite status
 * @param {boolean} wasFavorited - Current favorite status of the movie, before toggling
 * @returns {Promise<Movie>} - Updated movie data
 */
export async function toggleFavorite({
    movieId,
    wasFavorited,
}: {
    movieId: number;
    wasFavorited: boolean;
}) {
    const supabase = await createServerSupabaseClient();

    // movieId를 이용해 movie 테이블 속 데이터의 favorite를 토글
    const { data, error } = await supabase
        .from("movie")
        .update({
            favorited_date: !wasFavorited ? new Date().toISOString() : null,
        })
        .eq("id", movieId);

    handleError(error);

    return data;
}

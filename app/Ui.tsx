"use client";

import MovieCardList from "components/MovieCardList";

export default function Ui() {
    return (
        <main className="mt-16">
            {/* header height 고려, margin-top */}
            <MovieCardList />
        </main>
    );
}

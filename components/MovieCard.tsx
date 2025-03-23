"use client";

import Link from "next/link";

export default function MovieCard() {
    return (
        // 상위인 MovieCardList의 grid 관련 속성
        <div className="col-span-1 relative">
            {/* image */}
            <img
                className="w-full"
                src="https://i.namu.wiki/i/VxcEqMWsxyC8YMTUWSHBdqOl8kuHSKbf3K88X5x9stxH_ncMyMkP19OA0Tro2dVBW7hYpY20xn2Krpq3WjPWjw.webp"
                alt="Dune part 2"
            />

            {/* dim */}
            <Link href={`/movies/1`}>
                <div className="absolute top-0 bottom-0 left-0 right-0 z-10 bg-black opacity-0 hover:opacity-80 transition-opacity duration-300 flex items-center justify-center">
                    <p className="text-white text-center">Dune part 2</p>
                </div>
            </Link>
        </div>
    );
}

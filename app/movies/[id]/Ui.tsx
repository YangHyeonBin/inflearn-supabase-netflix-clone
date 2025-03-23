"use client";

export default function Ui({ movieId }: { movieId: string }) {
    return (
        // 기본: flex-col, md 이상일 때: flex-row
        <div className="flex flex-col md:flex-row items-center md:items-start gap-4 px-1 ">
            <img
                className="w-1/3"
                src="https://i.namu.wiki/i/VxcEqMWsxyC8YMTUWSHBdqOl8kuHSKbf3K88X5x9stxH_ncMyMkP19OA0Tro2dVBW7hYpY20xn2Krpq3WjPWjw.webp"
                alt="Dune part 2"
            />
            <div className="md:w-2/3 w-full flex flex-col items-center md:items-start md:py-2 gap-2">
                <h1 className="text-2xl font-bold">Dune: part two</h1>
                <p className="text-lg font-medium">description</p>
                <div className="text-lg font-bold flex items-center">
                    <i className="fa-solid fa-star mr-2"></i>
                    Vote Average: 8.3
                </div>
                <div className="text-lg font-bold">Popularity: 3333.221</div>
                <div className="text-lg font-bold">
                    Release Date: 2023-01-01
                </div>
            </div>
        </div>
    );
}

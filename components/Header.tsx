"use client";

import Logo from "./Logo";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-4 py-2 bg-black flex items-center justify-between">
            <nav className="flex gap-4 items-center">
                <Logo />
                <ul className="flex gap-2 text-white">
                    <li>Movies</li>
                    <li>Dramas</li>
                </ul>
            </nav>

            <div className="w-full max-w-sm flex items-center gap-2 border-2 border-gray-300 rounded-md p-2">
                <i className="fa-solid fa-magnifying-glass text-white"></i>
                <input
                    type="text"
                    placeholder="Search movies..."
                    className="bg-transparent text-white focus:outline-none"
                />
            </div>
        </header>
    );
}

"use client";

export default function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 p-4 bg-black">
            <p className="text-white text-center text-sm">
                Movie Database Scraped from{" "}
                <a
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline">
                    TMDB
                </a>
            </p>
        </footer>
    );
}

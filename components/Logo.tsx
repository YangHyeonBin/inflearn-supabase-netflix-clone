"use client";

import Image from "next/image";
import Link from "next/link";

export default function Logo() {
    return (
        <div className="flex items-center">
            <Link href="/">
                <Image
                    src="/tmdbflix_logo.png"
                    alt="tmdbflix logo"
                    width={120}
                    height={40}
                    priority
                    className="!w-120 !h-auto"
                />
            </Link>
        </div>
    );
}

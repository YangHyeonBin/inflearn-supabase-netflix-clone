"use client";

import { createContext, useContext, useEffect, useState } from "react";

type SearchContextType = {
    search: string;
    setSearch: (search: string) => void;
};

const SearchContext = createContext<SearchContextType>({
    search: "",
    setSearch: () => {},
});

export function SearchProvider({ children }: { children: React.ReactNode }) {
    // useState 사용하여 검색어 상태 관리
    const [search, setSearch] = useState("");

    // 하이드레이션 오류 방지를 위한 클라이언트 사이드 렌더링 확인
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // 마운트되기 전에는 children만 렌더링
    if (!mounted) {
        return <>{children}</>;
    }

    return (
        <SearchContext.Provider value={{ search, setSearch }}>
            {children}
        </SearchContext.Provider>
    );
}

// custom hook - 컴포넌트에서 쉽게 사용하기 위한 훅
export function useSearch() {
    const context = useContext(SearchContext);
    // if (!context) {
    //     throw new Error("useSearch must be used within a SearchProvider");
    // }
    return context;
}

# 개요

-   TMDB에서 제공하는 영화 데이터를 이용한 간단한 Netflix 클론 프로젝트

![초기 페이지](https://velog.velcdn.com/images/ekil_like/post/5b82c59c-efbe-4471-ad74-8dd915ca24cd/image.png)
![검색 중](https://velog.velcdn.com/images/ekil_like/post/48ec42a6-54be-4a68-8621-7a7271d5a60f/image.png)
![영화 상세 페이지](https://velog.velcdn.com/images/ekil_like/post/eae67fb9-e70c-4ef6-8d08-c0547014de49/image.png)

## 사용 기술

-   Next.js
-   React
-   Tailwind CSS
-   Supabase

## 구체적인 구현 내용

-   Supabase movie 테이블의 데이터 조회
-   찜한 목록, 찜하지 않은 전체 목록 나누어 조회 및 표시
-   찜하기 기능: 카드의 하트 버튼 클릭
-   찜한 목록은 가로 스크롤, 찜하지 않은 목록은 grid-col 배치
-   찜한 목록은 최근 찜한 영화가 먼저, 찜하지 않은 목록은 개봉일 빠른 영화가 먼저 나오게 정렬
-   검색 기능: 상단 검색바에서 검색어 입력, 대소문자 구분 없이 검색
-   상세 정보 조회: 영화 카드 클릭 시 영화 상세 페이지로 이동
-   상세 페이지별 메타데이터 설정

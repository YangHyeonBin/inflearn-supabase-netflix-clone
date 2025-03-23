// "use client";
// // 리코일을 사용할 수 있도록 프로바이더를 만드는데, 이건 클라이언트 컴포넌트에서 정의해야 함
// // server component인 layout.tsx에서 가져올 수 있게 독립적인 컴포넌트로 만듦 (ReactQueryProvider와 동일)

// import { RecoilRoot } from "recoil";

// export default function RecoilProvider({ children }: React.PropsWithChildren) {
//     return <RecoilRoot>{children}</RecoilRoot>;
// }

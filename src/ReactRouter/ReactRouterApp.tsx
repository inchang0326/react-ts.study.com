/**
 *  Router의 종류:
 *  (1) BrowserRouter:
 *  HTML5 History API를 사용하여 URI와 UI를 동기화한 상태를 유지할 수 있는 기능을 제공합니다.
 *  BrowserRouter는 URI 경로를 사용하여 브라우저의 주소를 저장하고, 브라우저 History 객체의 스택을 사용해 탐색합니다.
 *  BrowserRouter 사용은 웹 브라우저에서 리액트 라우터를 적용할 때 가장 권장하는 방법입니다.
 *  단, Fallback UI가 필요함.
 *  Fallback UI란, 예를들어, 404 Not Found 에러가 발생하더라도 정해진 페이지를 응답하는 것임. redirection과는 다름
 *  SPA 특성상 웹 페이지는 1개만 존재하는데(index.html),
 *  Vite의 SPA는 npm run dev 시 개발 서버에서 Fallback UI로 index.html을 기본으로 응답하도록 설정되어 있음
 *  따라서 주소창에 localhost:3000/about 처럼 진입하면, 해당 페이지 리소스가 없으니 실제론 404 Not Found 오류가 발생하지만,
 *  React Router가 Fallback UI(index.html)를 받아 '/about' 경로에 해당하는 화면을 랜더링함(<Route path="/about" element={<About />} />)
 *  배포 서버 환경에서도 모든 경로 요청에 대해 Fallback UI를 반환하도록 설정했는지 확인해야 하며, 필요한 경우 직접 설정해야 함
 *
 *  (2) HashRouter:
 *  URL의 해시 정보를 이용해서 URI 경로와 UI를 동기화한 상태로 유지합니다. 해시는 # 기호로 표시됩니다.
 *  이 라우터는 주로 BrowserRouter가 지원되지 않는 환경일 때 사용할 것을 권장합니다(Fallback UI 설정이 어려운 경우).
 *  HashRouter는 http://localhost:3000/#/about과 같이 # 다음에 /about 처럼 라우팅에 사용하는 경로가 브라우저의 주소 입력란에 찍힘
 *  (3) MemoryRouter:
 *  애플리케이션의 메모리 영역에 배열을 만들어 라우팅 정보를 저장하고 UI와 동기화 합니다.
 *  따라서 URI 경로가 브라우저의 주소창에 표시되지 않고 메모리에만 유지됩니다.
 *  브라우저 주소 UI를 보여주지 않아도 되는 하이브리드 앱 같은 경우에 사용할 수 있습니다.
 */
import "./ReactRouterAppCSS.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import pMinDelay from "p-min-delay";

import Header from "./Header";
/**
 *  SPA의 첫 페이지 로딩 오버헤드 단점을 극복하기 위한, 요구가 있을 때 리소스를 다운로드하는 lazy loading 기법(이후 갖고 있음)
 *  (+) React의 임베디드 컴포넌트인 Suspense와 함께 사용함
 */
// import Home from "./Home"; // eager loading
const Home = React.lazy(() => pMinDelay(import("./Home"), 1000)); // lazy loading
import About from "./About";
import Members from "./Members";
import Songs from "./Songs";
import SongDetail from "./SongDetail";
import ClassBasedSongDetail from "./ClassBasedSongDetail";
import YoutubePlayer from "./YoutubePlayer";
import SongIndex from "./SongIndex";
import NotFound from "./NotFound";
import Loading from "./Loading";

export default function ReactRouterApp() {
  return (
    // Suspense가 반환 받는 Promise의 pending / resolved를 확인하여, pending일 시 fallback ui를 제공함
    <React.Suspense fallback={<Loading></Loading>}>
      <Router>
        <div className="container">
          <Header></Header>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/about"
              element={<About title={"react-ts study"}></About>}
            ></Route>
            <Route path="/members" element={<Members></Members>}></Route>
            {/* 중첩 Route */}
            <Route path="/songs" element={<Songs></Songs>}>
              <Route index element={<SongIndex></SongIndex>}></Route>
              <Route
                path=":id"
                element={<YoutubePlayer></YoutubePlayer>}
              ></Route>
            </Route>
            {/* <Route
            path="/songs/:id"
            element={
              <ClassBasedSongDetail
                {...{ test: "test" }}
              ></ClassBasedSongDetail>
            }
          ></Route> */}
            {/* 만약 localhost:3000/test 처럼 없는 페이지를 요청하더라도 React Router가 의해 순차적으로 Route를 탐색하다가,
            404 Not Found 대신, Fallback UI인 index.html을 노출함.
            따라서 redirection 용도의 Route를 해주면 됨.
         */}
            <Route path="*" element={<NotFound></NotFound>}></Route>
          </Routes>
        </div>
      </Router>
    </React.Suspense>
  );
}

import * as React from "react";
import { Route, Routes, Link } from "react-router-dom";
import App2 from "./App2";

/*
  React.js는 대표적인 Single Page App(SPA) 개발 프레임워크로, 기본적으로 Client Side Rendering(CSR)을 지원한다. 
  하지만 CSR은 검색 노출 시 문제가 발생하는데, 검색 엔진의 Search Engine Optimization(SEO)은 보통 HTML만을 크롤링한다.
  따라서 SPA의 CSR 경우 .html은 아직 .js 실행 전 랜더링이 되어 있지 않은 상태라서, SEO 시 빈 .html을 크롤링하게 되어 검색 노출이 불리하다.
  최근 트렌드는 Next.js와 연계하여 Server Side Rendering(SSR)을 하거나, 미들웨어인 prerender.io를 사용하는 것이다.
  이러한 것들을 활용하면 SEO 시 서버에 의해 .js 실행 후 콘텐츠 랜더링 통해 완성된 .html을 크롤링할 수 있어 검색 노출이 유리하게 된다. 
  - SEO가 CSR과 SSR 각각 방문함
  - CSR은 그제서야 HTML을 만들기 시작하나, SEO는 기다리지 못하고 CSR을 pass 함
  - SSR도 그제서야 HTML을 만들려는 찰나, 서버의 도움으로 광속으로 만들어진 HTML을 받아 곧장 SEO에게 보여줌
*/

const App3 = () => {
  return <>App3</>;
};

interface AppProps {}

interface AppState {}

class App extends React.Component<AppProps, AppState> {
  /*
    component creating life-cycle
  */
  // 1. constructor: 익히 알고 있는 class의 생성자 정의
  constructor(props: AppProps) {
    console.log("App 생성자");
    super(props);
  }
  // 2. will mount
  componentWillmount(): void {
    console.log("App 컴포넌트 monut");
  }
  // 3. rendering
  render() {
    console.log("App 컴포넌트 rendered");
    // setState 시 re-render 수행하는 것으로, 상태 변경 필요한 값을 render() 내부에서 사용, 그렇지 않으면 render() 외부에서 사용
    return (
      <>
        <Link to="/">
          <img src="/vite.svg" />
          Home
        </Link>
        <br></br>
        <Routes>
          <Route path="/" element={<App2></App2>}></Route>
          <Route path="/App3"></Route>
        </Routes>
      </>
    );
  }
  // 3. did mount
  componentDidMount(): void {
    console.log("App 컴포넌트 mounted");
  }
  // 4. will unmount
  componentWillUnmount(): void {
    console.log("App 컴포넌트가 unmount");
  }

  /*
    component props, state update life-cycle
  */
  // 1. will receive props
  componentWillReceiveProps(
    nextProps: Readonly<AppProps>,
    nextContext: any
  ): void {
    // props 변경에 따른 호출 / state 변경과는 관련 없음
    console.log("App 컴포넌트 변경 props 받을것");
  }
  // 2. should update component
  shouldComponentUpdate(
    nextProps: Readonly<AppProps>,
    nextState: Readonly<AppState>,
    nextContext: any
  ): boolean {
    console.log("App 컴포넌트 state 변경에 따른 컴포넌트 should be updated");
    // return true, otherwise it will not update component
    return true;
  }
  // 3. will update component
  componentWillUpdate(
    nextProps: Readonly<AppProps>,
    nextState: Readonly<AppState>,
    nextContext: any
  ): void {
    console.log("App 컴포넌트 update 할것임");
  }
  // 4. re-rendering
  //
  // 5. component updated
  componentDidUpdate(
    prevProps: Readonly<AppProps>,
    prevState: Readonly<AppState>,
    snapshot?: any
  ): void {
    console.log("App 컴포넌트 update 되었음");
  }
}

export default App;

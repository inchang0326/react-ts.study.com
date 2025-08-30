import * as React from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Link } from "react-router-dom";

interface AppProps {}
interface AppState {
  count: number;
}

/*
    class 기반 컴포넌트 작성 방법
    - 컴포넌트를 기존 익히 아는 class로써 작성한다고 생각하면 이해하기 쉬움
    - render() 같은 함수의 경우, abstract class(React.Component)의 abstract method와 비슷함(오버라이딩 강제)
    - 컴포넌트 라이프사이클 관리를 위한 오버라이딩 method를 제공해줌
    요새 주류를 이루는 것은 function 기반 컴포넌트 작성 방법임
    - React Hooks와 연계가 강력한 장점이며, 컴포넌트 라이프사이클 또한 React Hooks에서 관리할 수 있음
    prev/next props or state 판단 후 re-rendering 최적화
    - class 기반 컴포넌트는 PureComponent를 상속 (+ immutable.js)
    - function 기반 컴포넌트는 useCallback/useMemo + React.memo의 React Hooks 사용
*/
class App2 extends React.Component<AppProps, AppState> {
  /*
    component creating life-cycle
  */
  // 1. constructor: 익히 알고 있는 class의 생성자 정의
  constructor(props: AppProps) {
    console.log("App2 생성자");
    super(props);
    this.state = {
      count: 0,
    };

    // 하단 increment()를 화살표 함수로(알아서 해당 컴포넌트 고정 바인딩) 선언했기 때문에 따로 현 컨텍스트(this) 바인딩 필요 없음
    // this.incrementCount = this.incrementCount.bind(this);
  }
  // 2. will mount
  componentWillmount(): void {
    console.log("App2 컴포넌트 monut 될것임");
  }
  // 3. rendering
  private incrementCount = () => {
    console.log("in incrementCount()");
    this.setState((prevState) => ({
      count: prevState.count + 1,
    }));
  };
  render() {
    console.log("App2 컴포넌트가 render 되었음");
    // setState 시 re-render 수행하는 것으로, 상태 변경 필요한 값을 render() 내부에서 사용, 그렇지 않으면 render() 외부에서 사용
    return (
      <>
        <Link to="/App3">App3</Link>
        <div>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
        </div>
        <h1>Vite + React</h1>
        <div className="card">
          <button onClick={this.incrementCount}>
            count is {this.state.count}
          </button>{" "}
          <p>
            Edit <code>src/App.tsx</code> and save to test HMR
          </p>
        </div>
        <p className="read-the-docs">
          Click on the Vite and React logos to learn more
        </p>
      </>
    );
  }
  // 3. did mount
  componentDidMount(): void {
    console.log("App2 컴포넌트가 mount 되었음 - render() 이후");
    // setInterval(() => {
    //   this.incrementCount();
    // }, 1000);
  }
  // 4. will unmount
  componentWillUnmount(): void {
    console.log("App2 컴포넌트가 unmount 될것임");
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
    console.log("App2 컴포넌트의 변경되는 props를 받을것");
  }
  // 2. should update component
  shouldComponentUpdate(
    nextProps: Readonly<AppProps>,
    nextState: Readonly<AppState>,
    nextContext: any
  ): boolean {
    console.log("App2 컴포넌트의 state 변경에 따라 컴포넌트 update 해야해");
    // return true, otherwise it will not update component
    return true;
  }
  // 3. will update component
  componentWillUpdate(
    nextProps: Readonly<AppProps>,
    nextState: Readonly<AppState>,
    nextContext: any
  ): void {
    console.log("App2 컴포넌트 update 할것임");
  }
  // 4. re-rendering
  // 5. component updated
  componentDidUpdate(
    prevProps: Readonly<AppProps>,
    prevState: Readonly<AppState>,
    snapshot?: any
  ): void {
    console.log("App2 컴포넌트 update 되었음");
  }
}

export default App2;

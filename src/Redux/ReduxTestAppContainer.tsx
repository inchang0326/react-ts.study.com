import AppStore from "./AppStore";
import { Provider } from "react-redux";
import ReduxTestApp from "./ReduxTestApp";
import "./ReduxTestAppCSS.css";

/**
 *  Redux = (ContextAPI + useReducer) + reducer 다중화 및 추상화 + middleware 통한 비동기 통신, 로깅, 모니터링 등 통합 환경 제공
 *  (+) 크롬 확장 가능한 Redux DevTools까지 제공됨 (redux toolkit의 configureStore에 내장되어 있는 middleware임)
 *      - Inspector: 시간순 액션 추적 및 액션에 의해 어떤 상태에서 어떤 상태로 바뀌었는지 확인 가능. time travel debugging의 핵심임
 *      - Log monitor: 액션과 액션 전 후 상태 로그 제공함. 수동 console.log() 보다 개선된 강력한 편의성 제공. + 핀 고정/상태 잠금 참고
 *      - Chart: Redux로 관리하는 애플리케이션의 상태를 시각화해서 보여줌. 플레이 버튼으로 처음부터 끝까지 상태 변화 관찰을 가능하게 함
 *  대규모 애플리케이션에서 장점이 극대화 되는데, 단점은 보일러 플레이트 코드라는 것 뿐인듯?
 */
const ReduxTestAppContainer = () => {
  console.log("ReduxTestAppContainer Rendering");
  return (
    <div>
      {/* 상태 변경으로 리랜더 되는 지점 확인 필요함! 
          => 상태 관리하는 상위 컴포넌트부터 리랜더링. 무조건적인 최상위에서부터 리랜더링은 아님!
      */}
      <Provider store={AppStore}>
        <ReduxTestApp></ReduxTestApp>
      </Provider>
    </div>
  );
};

export default ReduxTestAppContainer;

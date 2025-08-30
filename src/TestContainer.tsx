/**
 *  React.js의 데이터 철학은, 부모=>자식 간 데이터 단방향 흐름임
 *  : 부모만 state 관리 자식으로 props 통해 데이터 전달 / 자식의 부모 state 갱신은 eventHandler 통해 props callback function 호출
 *    (강제적인 원칙이라기 보단 경향성에 가까움)           (lifting state up, 상향 이벤트)
 *  그 결과, 어디서 데이터의 CRUD가 발생하고 어떻게 바뀌었고, 또한 어디서 데이터의 CRUD를 발생시켰는지 어떻게 바뀌게 했는지 추적이 용이해짐
 *         (부모 컴포넌트)                           (특정 callback function을 props로 전달한 자식 컴포넌트)
 *  하지만, 이 때문에 어쩔수없이 props drilling 발생하고, 모든 자식 컴포넌트에서 lifting state up하는 보일러 플레이트 코드가 발생함
 *  (대규모 애플리케이션에선 매우 큰 단점이 됨)
 *  장점을 취하고 단점을 극복하기 위해, ContextAPI 또는 외부 모듈(Redux, Recoil 등) 사용할 수 있음
 *  참고로 ContextAPI나 외부 모듈 또한 단방향 데이터 흐름을 그대로 유지함
 *  - 전달 경로를 단축할 뿐, 데이터의 방향을 바꾸지 않음. 예를들어, ContextAPI는 Provider에서 하위 트리 노드로만 value를 줄 수 있음
 *  양방향은 UI에서 직접 모델을 바꾸고 바로 UI에 반영되는 구조인 반면, React.js는 "상향 이벤트 > 상위 상태 갱신 > 하위로 상태 전달" 단방향임
 *  *혹시나, 모든 자식이 자체 상태 관리 통해 자신의 UI와 데이터를 직접 갱신하도록 고려한다면, 자식 마다 동일한 상태를 관리할 때 유지보수가 힘듦
 *  *하지만, ContextAPI나 외부 모듈을 남발하여 모든 컴포넌트에 적용해선 안 됨. React 컴포넌트의 큰 장점은 의존성이 덜한 재사용성이기 때문임
 */
import { useState } from "react";
import Footer from "./StyledComponents/Footer";
import Calc from "./Basic/Calc";
import OnClickEvent from "./EventHandling/OnClickEvent";
import ChangeEvents from "./EventHandling/ChangeEvents";
import UseRefTest from "./EventHandling/UseRefTest";
import ClockApp from "./ClassBasedReactComponents/DigitalClock/ClockApp";
import GetDerivedStateFromPropsTest from "./ClassBasedReactComponents/GetDerivedStateFromPropsTest/GetDerivedStateFromPropsTest";
import TodoListAppContainer from "./ClassBasedReactComponents/TodoListApp/TodoListAppContainer";
import UseReducerTestApp from "./FunctionBasedReactComponentsReactHooks/UseReducerTestApp";
import UseRefTestApp from "./FunctionBasedReactComponentsReactHooks/UseRefTestApp";
import CustomHooksTestApp, {
  TimeFormatEnum,
  useClockTime,
} from "./FunctionBasedReactComponentsReactHooks/CustomHooksTestApp";
import Child from "./HighOrderFunction/Child";
export type CountryType = {
  no: number;
  country: string;
  visited: boolean;
};
import { withLogging } from "./HighOrderFunction/withLogging";
import WithLoadingTestApp from "./HighOrderFunction/WithLoadingTestApp";
import UserProfile from "./HighOrderFunction/Advanced/FunctionBased/UserProfile";
import HighOrderFunctionApp from "./HighOrderFunction/Advanced/ClassBased/HighOrderFunctionApp";
import TodoApp from "./ContextAPI/TodoApp";
import ReactRouterApp from "./ReactRouter/ReactRouterApp";
import ReactRouterAdvancedAppContainer from "./ReactRouter/AdvancedWithAxios/ReactRouterAdvancedAppCotainer";
import ReduxTestAppContainer from "./Redux/ReduxTestAppContainer";
import ParentChildrenTest from "./Basic/ParentChildrenTest";
import EventPropagation from "./Basic/EventPropagation";
import EventPropagationFormTag from "./Basic/EventPropagtionFormTag";
import ReactQueryTestContainer from "./ReactQuery/ReactQueryTestContainer";

// import OriginTestApp from "./OriginTestApp";

const TestContainer = () => {
  const [msg, setMsg] = useState<string>("World");
  //  const currentTime = useClockTime(1000, TimeFormatEnum.HHmmss);
  // withLogging((a: number, b: number) => a + b)(1, 2);
  return (
    <div>
      <ReactQueryTestContainer></ReactQueryTestContainer>
    </div>
  );
};

export default TestContainer;

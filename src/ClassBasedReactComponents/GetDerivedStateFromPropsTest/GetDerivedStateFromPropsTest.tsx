import PropTypes, { number, string } from "prop-types";
import * as React from "react";

interface Props {
  level: string;
}

interface State {
  discountRate: number;
  customerName: string;
}

export default class Child extends React.Component<Props, State> {
  state: State = {
    discountRate: 0,
    customerName: "홍길동",
  };

  constructor(props: Props) {
    super(props);
    console.log("constructor Generated");
  }

  /**
   *  부모 컴포넌트로부터 props를 전달받음으로써 해당 컴포넌트의 state가 달라질 때 사용함
   *  props 가공 및 필터링 용도인 것 같은데, 하지만 일반적으로 전달받은 props 그대로 사용하기에 쓸모가 크진 않음
   */
  static getDerivedStateFromProps(props: Props, state: State) {
    console.log("getDerivedStateFromProps Generated");
    let tempRate = 0;
    if (props.level === "GOLD") tempRate = 0.15;
    else if (props.level === "SILVER") tempRate = 0.1;
    else if (props.level === "BRONZE") tempRate = 0.05;
    else tempRate = 0.02;
    /**
     *  state 갱신을 위해 얕은 비교 위해 불변성 유지여부 확인을 통과하기 위해
     *  spread operator 통해 깊은 복사 후 discountRate 값만 변경함
     */
    return { ...state, discountRate: tempRate };
  }

  render() {
    console.log("render Generated");
    return (
      <div>
        {this.state.customerName} 님의 할인율은 {this.state.discountRate * 100}%
        입니다.
      </div>
    );
  }

  componentDidMount(): void {
    console.log("componentDidMount Generated");
  }
  componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>,
    snapshot?: any
  ): void {
    console.log("componentDidUpdate Generated");
  }
  /**
   *  일반적으로 componentDidMount와 짝을 이뤄 compoenet가 un-mount 될 때 componentDidMount에서 연결한 외부 리소스를 해제할 때 사용함
   *  즉, memory leak 방지 용도
   */
  componentWillUnmount(): void {}
}

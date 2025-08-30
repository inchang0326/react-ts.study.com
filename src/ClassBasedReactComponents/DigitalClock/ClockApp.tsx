import React from "react";
import Clock from "./Clock";

interface ClockAppProps {}

interface ClockAppState {
  formatString: string;
  clockVisible: boolean;
}

export default class ClockApp extends React.Component<
  ClockAppProps,
  ClockAppState
> {
  /**
   *  컴포넌트가 mount 될 때 가장 먼저 호출됨
   *  class based react-component의 constructor 사용성
   *  - constructor 작성 시 super(props)는 무조건 작성 해줘야 함
   *  - state init 위해 사용함, init 할 state가 없다면 사용하지 않아도 됨
   *  - 화살표 함수가 아닌 일반 함수 작성 시, this binding 코드를 작성함
   */
  constructor(props: ClockAppProps) {
    super(props);
    this.state = {
      formatString: "HH:mm:ss",
      clockVisible: false,
    };
  }

  private chgForm = (format: string) => {
    this.setState({ formatString: format });
  };
  /**
   *  가상 DOM으로 rendering 하는 함수로, function based react-component의 return 문에 해당함
   *  만약 props 또는 state의 변경이 없었다면, 같은 결과를 반환해야 함
   */
  render() {
    return (
      <div className="boxStyle">
        <h2>간단한 디지털 시계</h2>
        <hr />
        <button
          onClick={() =>
            this.setState({
              ...this.state,
              clockVisible: !this.state.clockVisible,
            })
          }
        >
          시계 토글하기
        </button>
        {this.state.clockVisible ? (
          <Clock formatString={this.state.formatString}></Clock>
        ) : (
          ""
        )}
      </div>
    );
  }
}

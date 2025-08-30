import React from "react";
import * as DateAndTime from "date-and-time";

interface ClockProps {
  formatString: string;
}

interface ClockState {
  currentTime: Date;
}

export default class Clock extends React.Component<ClockProps, ClockState> {
  // state init 시 constructor에서 해줘도 되지만, constructor 내부에선 타입 지정을 할 수 없기 때문에, 외부에서 init 함
  state: ClockState = {
    currentTime: new Date(),
  };

  handle: number = 0;

  constructor(props: ClockProps) {
    super(props);
  }

  render() {
    return (
      <div className="boxStyle">
        <h3>
          {DateAndTime.format(this.state.currentTime, this.props.formatString)}
        </h3>
      </div>
    );
  }

  // render()에 의한 가상 DOM 통해 실제 DOM까지 rendering이 반영된 후 호출됨
  componentDidMount = () => {
    this.handle = setInterval(() => {
      console.log("## tick!");
      this.setState({ currentTime: new Date() });
    }, 1000);
  };

  /**
   *  일반적으로 componentDidMount와 짝을 이뤄 compoenet가 un-mount 될 때 componentDidMount에서 연결한 외부 리소스를 해제할 때 사용함
   *  즉, memory leak 방지 용도
   */
  componentWillUnmount = () => {
    // componentDidMount에서 생성한 interval 리소스를 해제함
    clearInterval(this.handle);
  };
}

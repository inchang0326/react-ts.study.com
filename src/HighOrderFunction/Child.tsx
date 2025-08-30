import { connectClockTime, TimeFormatEnum } from "./connectClockTime";
import { connectMousePos } from "./connectMousePos";

type PositionType = {
  x: number;
  y: number;
};

type ChildProps = {
  currentTime: string;
  position: PositionType;
};

const Child = (props: ChildProps) => {
  return (
    <div>
      <h2>고차 컴포넌트 사용하기</h2>
      <div>현재 시각: {props.currentTime}</div>
      <hr />
      <div>
        마우스 위치: {props.position.x}, {props.position.y}
      </div>
    </div>
  );
};

export default connectMousePos(
  connectClockTime(Child, TimeFormatEnum.HHmmssKOR, 1000)
);

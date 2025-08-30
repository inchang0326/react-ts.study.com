import React from "react";

export default function EventPropagation() {
  const first = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    alert("Hi, First!");
  };
  const second = () => {
    alert("Hi, Second!");
  };
  const third = () => {
    alert("Hi, Third!");
  };

  // onClick 시 기본적으로 이벤트 버블링 발생(자식부터 부모까지 이벤트가 전파됨)
  // => onClickCapture 사용 시 이벤트 캡쳐링 발생(부모부터 자식까지 이벤트가 전파됨)
  // => stopPropagation() 함수 통해 이벤트 전파를 방지할 수 있음
  return (
    <div onClickCapture={first}>
      <div onClick={second}>
        <div onClick={third}>이벤트 전파 테스트(캡쳐링, 버블링)</div>
      </div>
    </div>
  );
}

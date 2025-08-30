import { useState, ChangeEvent } from "react";

function ChangeEvents() {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  /**
   *  만약 input에 의해(urgent update) change가 발생되는 동안 UI 랜더링이(non-urgent update/transition) 과다 발생한다면
   *  useTransition React Hooks를 사용함으로써 UI 랜더링을 transition 상태로 두고 fallback UI를 제공해줄 수도 있음!
   *  그런데 UI 랜더링이 자식 컴포넌트에서 발생한다면, useTransition 아닌 자식 컴포넌트 내 useDefferedValue React Hooks를 사용해야 함
   */
  function chVal(e: ChangeEvent<HTMLInputElement>) {
    let nVal: number = parseInt(e.target.value);
    if (isNaN(nVal)) nVal = 0;
    if (e.target.id === "x") setX(nVal);
    else setY(nVal);
  }
  return (
    <>
      <h3>제어 컴포넌트</h3>
      <div>
        X : <input id="x" type="text" value={x} onChange={chVal}></input>
        <br />Y : <input id="y" type="text" value={y} onChange={chVal}></input>
        <br />
        <span>Result: {x + y}</span>
      </div>
    </>
  );
}

export default ChangeEvents;

import { useRef, useState } from "react";

type Props = {};

function UseRefTest(props: Props) {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [result, setResult] = useState<number>(0);

  const elemX = useRef<HTMLInputElement>(null);
  const elemY = useRef<HTMLInputElement>(null);

  function add() {
    let x1: number = parseInt(elemX.current ? elemX.current.value : "", 10);
    let y1: number = parseInt(elemY.current ? elemY.current.value : "", 10);
    if (isNaN(x1)) x1 = 0;
    if (isNaN(y1)) y1 = 0;

    setX(x1);
    setY(y1);
    setResult(x1 + y1);
  }

  return (
    <>
      <div>
        X : <input id="x" type="text" defaultValue={x} ref={elemX}></input>
        <br />Y :{" "}
        <input id="y" type="text" defaultValue={y} ref={elemY}></input>
        <br />
        <button onClick={add}>덧셈</button>
        <br />
        결과 : <span>{result}</span>
      </div>
    </>
  );
}

export default UseRefTest;

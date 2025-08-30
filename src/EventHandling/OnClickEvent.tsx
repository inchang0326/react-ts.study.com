import { useState } from "react";

export default function OnClickEvent() {
  const [number, setNumber] = useState<number>(0);

  function onClick() {
    setNumber(number + 1);
  }

  return (
    <>
      <div onClick={onClick}>
        <h2>{number}</h2>
      </div>
    </>
  );
}

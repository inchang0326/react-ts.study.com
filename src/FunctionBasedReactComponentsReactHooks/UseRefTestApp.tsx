import React, { useRef, useState } from "react";

const UseRefTestApp = () => {
  const [name, setName] = useState("홍길동");
  const refTel = useRef("010-2222-2222");

  const elName: React.RefObject<HTMLInputElement | null> =
    useRef<HTMLInputElement>(null);

  const goFirstInputElement = () => {
    if (elName.current) elName.current.focus();
  };

  return (
    <>
      <div className="boxStyle">
        <h2>상태 데이터</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <br />
        <div> 상태(name): {name}</div>
        <hr />
        <input
          type="Text"
          onChange={(e) => (refTel.current = e.target.value)}
        ></input>
        <br />
        <div> refTel 값: {refTel.current}</div>
      </div>
      <div className="boxStyle">
        이름: <input ref={elName} type="text" defaultValue="홍길동"></input>
        <br />
        전화: <input type="text" defaultValue="010-2222-2222"></input>
        <br />
        주소: <input type="text" defaultValue="서울"></input>
        <br />
        <button onClick={goFirstInputElement}>첫번째 필드로 포커스 이동</button>
      </div>
    </>
  );
};

export default UseRefTestApp;

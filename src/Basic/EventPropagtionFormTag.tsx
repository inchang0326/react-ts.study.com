import React from "react";
export default function EventPropagationFormTag() {
  // form 태그 submit 시, 제출 이벤트로 인해 새로고침이 발생함
  // => preventDefault() 함수 통해 해당 이벤트 전파를 방지할 수 있음
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">제출</button>
      </form>
    </div>
  );
}

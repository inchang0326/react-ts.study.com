import React from "react";
import { useLocation } from "react-router-dom";

interface HomeProps {}

interface LocationState {
  from: string;
}

export default function Home(props: HomeProps) {
  // useLocation 통해 랜딩 위해 useNavigate 또는 Navigate 호출한 특정 페이지와 전달한 상태를 취득할 수 있음
  const location = useLocation();
  const state = location.state as LocationState;
  const from = state ? state.from : "";
  return (
    <div className="card card-body">
      <h2>Home</h2>
      {from !== "" ? <h4>state.from: {from}</h4> : ""}
    </div>
  );
}

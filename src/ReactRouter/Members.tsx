import React from "react";
import { useNavigate } from "react-router-dom";

interface MembersProps {}

export default function Members(props: MembersProps) {
  const navigate = useNavigate();
  const goHome = () => {
    if (window.confirm("정말 홈으로 이동 할까요?")) {
      navigate("/", { state: { from: "/members" } });
    }
  };
  return (
    <div className="card card-body">
      <h2>Members</h2>
      <button className="btn btn-secondary" onClick={goHome}>
        Go Home
      </button>
    </div>
  );
}

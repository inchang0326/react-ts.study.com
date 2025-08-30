import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import TestContainer from "./TestContainer";

createRoot(document.getElementById("root")!).render(
  // StricMode 시 의도적으로 컴포넌트를 2번씩 rendering 함으로써, side-effect가 있는지 없는지 확인하게 해줌
  // <StrictMode>
  // <Router>
  <TestContainer />
  // </Router>
  // </StrictMode>
);

import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="m-3">
      <h3>존재하지 않습니다: {location.pathname}</h3>
    </div>
  );
};

export default NotFound;

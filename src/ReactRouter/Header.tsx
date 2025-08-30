import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <div className="card bg-light">
      <div className="card-heading">
        <h2 className="text-center m-3">Foxes and Fossils</h2>
        <p>
          <a href="http://foxesandfossils.com">http://foxesandfossils.com</a>
        </p>
        <div className="row">
          <div className="col-12">
            {/* NavLink 통해 동적 CSS를 적용할 수 있으며, useMatch 통하지 않고 손 쉽게 현재 사용하는 navigation menu를 확인할 수 있음*/}
            <NavLink
              className={({ isActive }) => {
                return isActive ? "btn menu btn-dark" : "btn menu btn-sucess";
              }}
              to="/"
            >
              Home
            </NavLink>
            <Link className="btn btn-success menu" to="/about">
              About
            </Link>
            <Link className="btn btn-success menu" to="/members">
              Members
            </Link>
            <Link className="btn btn-success menu" to="/songs">
              Songs
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

import { NavLink } from "react-router-dom";

function Head() {
  return (
    <div className="nav">
      <nav>
        <NavLink to="/Login" activeClassName="active">Login</NavLink>
      </nav>
      <nav>
        <NavLink to="/Registe" activeClassName="active">Register</NavLink>
      </nav>
    </div>
  );
}

export default Head;

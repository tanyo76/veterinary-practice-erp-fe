import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <h1>404! Page not found</h1>
      <NavLink to="/">Go back</NavLink>
    </div>
  );
};

export default PageNotFound;

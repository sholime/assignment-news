import React from "react";
import { Link } from "react-router-dom";

import "../../Styles/Navigation.scss";

function Navigation() {
  return (
    <header className="Navigation">
      <div>
        <Link to="/infinite" className="Infinite">InfiniteSroll</Link>
      </div>
      <div>
        <Link to="/" className="Home">Assignment News</Link>
      </div>
      <div>
        <Link to="/pagination" className="Pagination">Pagination</Link>
      </div>
    </header>
  );
}

export default Navigation;

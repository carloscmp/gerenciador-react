import React from "react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  return (
    <nav className=" navbar navbar-expand-lg navbar-light bg-secondary">
      <div className="container-fluid px-4">
        <Link className="navbar-brand" to="/">
        WTEC REFRIGERAÇÃO
        </Link>
        
      </div>
    </nav>
  );
};

export default Header;

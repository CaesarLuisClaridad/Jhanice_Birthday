import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useState } from "react";
import logo_1 from "../../assets/logo_1.png"

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className={`navbar navbar-expand-lg ${isCollapsed ? "bg" : "bg-transparent"}`}>
    <div className="container-fluid px-lg-3 px-md-3 pt-lg-1 pb-lg-2 pb-md-3 pt-md-4">
      <Link to="/" className="navbar-brand">
        <img
          src={logo_1}
          alt="Logo"
          className="d-inline-block align-text-top logo"
        />
      </Link>
  
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        onClick={handleToggle}
      >
        <span className="text-light opacity-100 opacity-md-75 opacity-lg-75">
          <GiHamburgerMenu className="burger" />
        </span>
      </button>
  
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0 text-sm-center justify-content-sm-center text-lg-start justify-content-lg-end">
          <Link to="/" className="nav-item text-decoration-none fs-6 px-1">
            <a className="nav-link text-decoration-none" href="#">
              Home
            </a>
          </Link>
          <Link to="/explore" className="nav-item fs-6 px-1">
            <a className="nav-link text-decoration-none" href="#">
              Explore
            </a>
          </Link>
          <Link to="/postGreetings" className="nav-item fs-6 px-1">
            <a className="nav-link" href="#">
              Post Greetings
            </a>
          </Link>
          <Link to="/greetings" className="nav-item fs-6 px-1">
            <a className="nav-link" href="#">
              View Greetings
            </a>
          </Link>
        </ul>
      </div>
    </div>
  </nav>
  
  );
};

export default Navbar;

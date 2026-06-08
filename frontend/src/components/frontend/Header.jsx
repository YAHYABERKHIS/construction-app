import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../LanguageSwitcher";
import logo from "/logo.png";

const Header = () => {
  const path = useLocation();
  const { t } = useTranslation();

  const getNavClass = (currentPath) => {
    if (path.pathname.includes(currentPath) && currentPath !== "/") {
      return "active";
    }
    return currentPath === path.pathname ? "active" : "";
  };
  return (
    <header>
      <div className="container py-3">
        <Navbar expand="lg">
          <Navbar.Brand as={Link} to="/" className="logo">
            <span className="logo-wrap">
              <img src={logo} alt="GHANI SAKAN logo" className="logo-img" />
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/" className={getNavClass("/")}>
                {t('nav.home')}
              </Nav.Link>
              <Nav.Link as={Link} to="/about" className={getNavClass("/about")}>
                {t('nav.about')}
              </Nav.Link>
              <Nav.Link as={Link} to="/services" className={getNavClass("/services")}>
                {t('nav.services')}
              </Nav.Link>
              <Nav.Link as={Link} to="/projects" className={getNavClass("/projects")}>
                {t('nav.projects')}
              </Nav.Link>
              <Nav.Link as={Link} to="/blogs" className={getNavClass("/blogs")}>
                {t('nav.blog')}
              </Nav.Link>
              <Nav.Link
                as={Link}
                to="/demander-service"
                className={getNavClass("/demander-service")}
              >
                {t('nav.contact')}
              </Nav.Link>
              <LanguageSwitcher className="nav-lang-wrap" />
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </header>
  );
};

export default Header;

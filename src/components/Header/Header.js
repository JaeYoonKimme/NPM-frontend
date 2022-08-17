import React from "react";
import { Container, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import profile from "../../img/profile.png";

function Header({ isLogin, setIsLogin, info, setInfo }) {
  return (
    <Navbar bg="yellow" variant="light">
      <Container>
        <Col lg="4"></Col>
        <Col lg="4">
          <Nav className="justify-content-around">
            <Link to="/">Erooming</Link>
          </Nav>
        </Col>
        <Col lg="4">
          <Nav className="justify-content-end">
            <NavDropdown
              title={
                <img
                  src={profile}
                  alt=""
                  style={{ borderRadius: "50%" }}
                  width="30"
                  height="30"
                />
              }
            >
              <NavDropdown.Item>
                <Link to="/profile">마이페이지</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to={isLogin ? '/logout' : "/login"}>{isLogin ? '로그아웃' : '로그인'}</Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Header;

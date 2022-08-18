import React from "react";
import { Container, Col, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getLogout } from '../../api/getLogout';
import profile from "../../img/profile.png";

function Header({ isLogin, setIsLogin, info, setInfo }) {

  const onClick = () => {
    getLogout();
    setIsLogin(false);
  }

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
            {isLogin ? (
              <NavDropdown
                title={
                  <img
                    src={info.profile_url}
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
                <NavDropdown.Item onClick={onClick}>
                  로그아웃
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link to="/login">로그인</Link>
            )}
          </Nav>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Header;

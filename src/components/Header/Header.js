import React from "react";
import { Container, Col, Nav, Navbar, NavDropdown, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getLogout } from '../../api/getLogout';
import profile from "../../img/profile.png";

function Header({ isLogin, setIsLogin, info, setInfo }) {

  const onClick = () => {
    getLogout();
    setIsLogin(false);
  }

  return (
    <Navbar bg="outlined-warning" variant="light">
      <Container>
        <Col lg="4"></Col>
        <Col lg="4">
          <Nav className="justify-content-around">
            <Navbar.Brand href="/">
              <img
                alt="logo"
                src="/logo.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />{' '}
              Erooming
            </Navbar.Brand>
          </Nav>
        </Col>
        <Col lg="4">
          <Nav className="justify-content-end">
            {isLogin ? (
              <NavDropdown id="basic-nav-dropdown"
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
                <NavDropdown.Item href="/">마이페이지</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onClick}>로그아웃</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Button variant="outline-success" href="/login">로그인</Button> 
            )}
          </Nav>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Header;
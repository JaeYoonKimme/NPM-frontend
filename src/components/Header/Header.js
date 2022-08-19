import { Container, Col, Nav, Navbar, NavDropdown, Button, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getLogout } from '../../api/getLogout';
import profile from "../../img/profile.png";
import { React, useEffect} from 'react';
import { postLoginToken } from '../../api/postLoginToken';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

function Header({ isLogin, setIsLogin, info, setInfo }) {

  const onClick = () => {
    getLogout();
    setIsLogin(false);
  }

  const client_id = process.env.REACT_APP_CLIENT_ID;
  const navigate = useNavigate();
  const onGoogleSignIn = async res => {
    const result = await postLoginToken(res.accessToken, setIsLogin);
    setIsLogin(result);
  };

  useEffect(() => {
    if (!isLogin) return;
    navigate('/');
  }, [isLogin]);

  useEffect(() => {
    function start() {
      gapi.client.init({
        client_id,
        scope: 'email',
      });
    }
    gapi.load('client:auth2', start);
  }, []);


  return (
    <Navbar bg="warning" variant="light">
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
                    src={info.profile_url}
                    alt=""
                    style={{ borderRadius: "50%" }}
                    width="30"
                    height="30"
                  />
                }
              >
                <NavDropdown.Item as={Link} to='/profile'>마이페이지</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onClick}>로그아웃</NavDropdown.Item>
              </NavDropdown>
            ) : (
                <GoogleLogin
                clientId={client_id}
                render={renderProps => (
                  <Button variant="success" onClick={renderProps.onClick}>LOGIN</Button>
                )}
                onSuccess={onGoogleSignIn}
                onFailure={onGoogleSignIn}
                
              />
            )}
          </Nav>
        </Col>
      </Container>
    </Navbar>
  );
}

export default Header;
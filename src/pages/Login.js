import { React, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { postLoginToken } from '../api/postLoginToken';
import GoogleLogin from 'react-google-login';
import { gapi } from 'gapi-script';

function Login({ isLogin, setIsLogin }) {
  const client_id = process.env.CLIENT_ID;
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
    <>
      <h1>같은 목표를 가진 사람들과 함께 하니까 끝까지 해낼 수 있어요!</h1>
      <h2>대한민국 1등 건강습관 앱, Erooming</h2>
      <GoogleLogin
          clientId={client_id}
          buttonText="LOGIN WITH GOOGLE"
          onSuccess={onGoogleSignIn}
          onFailure={onGoogleSignIn}
        />
    </>
  )
}

export default Login;
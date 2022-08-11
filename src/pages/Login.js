import { React, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { postLoginToken } from '../api/postLoginToken';
import GoogleLogin from '../components/GoogleLogin/GoogleLogin';

function Login({ isLogin, setIsLogin }) {
  const navigate = useNavigate();
  const onGoogleSignIn = async res => {
    const { credential } = res;
    const result = await postLoginToken(credential, setIsLogin);
    setIsLogin(result);
  };

  useEffect(() => {
    if (!isLogin) return;
    navigate('/');
  }, [isLogin]);

  return (
    <>
      <h1>같은 목표를 가진 사람들과 함께 하니까 끝까지 해낼 수 있어요!</h1>
      <h2>대한민국 1등 건강습관 앱, Erooming</h2>
      <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
    </>
  )
}

export default Login;
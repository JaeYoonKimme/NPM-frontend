import { React, useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import RoutineList from './pages/RoutineList';
import RoutineDetail from './pages/RoutineDetail';
import Mypage from './pages/Mypage';
import Login from './pages/Login'
import Logout from './pages/Logout'
import { getUserInfo } from './api/getUserInfo';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const initLogin = async () => {
      const name = await getUserInfo();
      setIsLogin(!!name);
    };
    initLogin();
  }, []);

  const [info, setInfo] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
  });

  useEffect(() => {
    const initUserinfo = async () => {
      const newinfo = await getUserInfo();
      setInfo(newinfo);
    };
    initUserinfo();
  }, [isLogin]);

  return (
    <>
      <Header isLogin={isLogin} setLogin={setIsLogin} info={info} setInfo={setInfo}/>
      <Routes>
        <Route path="/" element={<RoutineList/>} />
        <Route path="/detail/:id" element={<RoutineDetail/>} />
        <Route path="/profile" element={<Mypage info={info}/>} />
        <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route path="/logout" element={<Logout setIsLogin={setIsLogin}/>} />
      </Routes>
    </>
  );
}

export default App;

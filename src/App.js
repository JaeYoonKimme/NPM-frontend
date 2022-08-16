import { React, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import RoutineList from './pages/RoutineList';
import RoutineDetail from './pages/RoutineDetail';
import Mypage from './pages/Mypage';
import Login from './pages/Login'
// import RoutineCreate from './pages/RoutineCreate';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header isLogin={isLogin}/>
      <Routes>
        <Route path="/" element={<RoutineList/>} />
        <Route path="/detail/:id" element={<RoutineDetail/>} />
        <Route path="/profile" element={<Mypage/>} />
        <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
      </Routes>
    </>
  );
}

export default App;

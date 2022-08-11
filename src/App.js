import { React, useState } from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import GoalList from './pages/GoalList';
import GoalDetail from './pages/GoalDetail';
import Mypage from './pages/Mypage';
import Login from './pages/Login'

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <>
      <Header isLogin={isLogin}/>
      <Routes>
        <Route path="/" element={<GoalList/>} />
        <Route path="/detail" element={<GoalDetail/>} />
        <Route path="/profile" element={<Mypage/>} />
        <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
      </Routes>
    </>
  );
}

export default App;

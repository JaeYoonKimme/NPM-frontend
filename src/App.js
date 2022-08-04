import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import GoalList from './pages/GoalList';
import GoalDetail from './pages/GoalDetail';
import Mypage from './pages/Mypage';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GoalList/>} />
        <Route path="/detail" element={<GoalDetail/>} />
        <Route path="/profile" element={<Mypage/>} />
      </Routes>
    </>
  );
}

export default App;

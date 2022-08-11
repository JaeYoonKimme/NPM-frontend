import React from 'react';
import { Routes, Route } from "react-router-dom";
import Header from './components/Header/Header';
import RoutineList from './pages/RoutineList';
import RoutineDetail from './pages/RoutineDetail';
import Mypage from './pages/Mypage';
import RoutineCreate from './pages/RoutineCreate';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<RoutineList/>} />
        <Route path="/detail/:id" element={<RoutineDetail/>} />
        <Route path="/profile" element={<Mypage/>} />
        <Route path="/create" element={<RoutineCreate/>} />
      </Routes>
    </>
  );
}

export default App;

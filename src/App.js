import { React, useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import RoutineList from "./pages/RoutineList";
import RoutineDetail from "./pages/RoutineDetail";
import Mypage from "./pages/Mypage";
import Login from "./pages/Login";
import { getUserInfo } from "./api/getUserInfo";
import { postLoginToken } from "./api/postLoginToken";


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [header, setHeader] = useState({});

  useEffect(() => {
    const initLogin = async () => {
      const name = await getUserInfo();
      setIsLogin(!!name);
    };
    initLogin();
  }, []);

  const [info, setInfo] = useState({
    pk: "",
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    profile_url: "",
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
      <Header
        isLogin={isLogin}
        setIsLogin={setIsLogin}
        info={info}
        setInfo={setInfo}
        header={header}
        setHeader={setHeader}
      />
      <Routes>
        <Route
          path="/list"
          element={<RoutineList isLogin={isLogin} info={info} header={header} />}
        />
        <Route
          path="/detail/:id"
          element={<RoutineDetail isLogin={isLogin} info={info} header={header} />}
        />
        <Route
          path="/profile"
          element={<Mypage isLogin={isLogin} info={info} header={header} />}
        />
        <Route
          path="/login"
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} header={header} />}
        />
      </Routes>
    </>
  );
}

export default App;

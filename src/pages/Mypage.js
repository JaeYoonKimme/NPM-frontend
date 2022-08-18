import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


function Mypage({isLogin, info}) {
  const [routines, setRoutines] = useState([]);

  const navigate = useNavigate();
  if (!isLogin) navigate('/');

  const uid = 12345678

  useEffect(() => {
    axios
      .get("http://" + process.env.REACT_APP_API_URL + `/api/user_routine_list/${uid}`
      )
      .then((res)=>{
         setRoutines([...res.data]);
      })
      .catch((err) => console.log(err));
    }, []);

  return (
    <>
      <h1>Mypage</h1>
      <h2>username : {info.username}</h2>
      <h2>pk : {info.pk}</h2>
      <h2>email : {info.email}</h2>
      <h2>first name : {info.first_name}</h2>
      <h2>last name : {info.last_name}</h2>
      <h2>profile url : {info.profile_url}</h2>
      <div style={{ fontSize: "3em" }}>Routine List</div>
      <div>
        {routines.map((routine, idx) => (
          <RoutineContent key={idx} routine={routine} />
        ))}
      </div>
    </>
  )
}

export default Mypage;
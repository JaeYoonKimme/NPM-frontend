import React from 'react';
import { useNavigate } from 'react-router-dom';

function Mypage({isLogin, info}) {
  const navigate = useNavigate();
  if (!isLogin) navigate('/');

  return (
    <>
      <h1>Mypage</h1>
      <h2>username : {info.username}</h2>
      <h2>pk : {info.pk}</h2>
      <h2>email : {info.email}</h2>
      <h2>first name : {info.first_name}</h2>
      <h2>last name : {info.last_name}</h2>
      <h2>profile url : {info.profile_url}</h2>
    </>
  )
}

export default Mypage;
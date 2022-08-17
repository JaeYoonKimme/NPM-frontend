import React from 'react';

function Mypage({info}) {
  return (
    <>
      <h1>Mypage</h1>
      <h2>username : {info.username}</h2>
      <h2>email : {info.email}</h2>
      <h2>first name : {info.first_name}</h2>
      <h2>last name : {info.last_name}</h2>
    </>
  )
}

export default Mypage;
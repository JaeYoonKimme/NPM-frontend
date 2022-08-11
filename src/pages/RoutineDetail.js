import React from 'react';
import { useLocation } from 'react-router-dom';

function GoalDetail() {

  const location = useLocation();
  console.log(location);
  const id = location.state.id;
  const title = location.state.title;
  const start_date = location.state.start_date;
  const end_date = location.state.end_date;
  const des = location.state.description;


  return (
    <>
      <h1>Detail</h1>
      <h2>{title}</h2>
      <p>{des}</p>
      <p>{start_date} ~ {end_date}</p>
    </>
  )
}

export default GoalDetail;
import React from 'react';
import { Link } from "react-router-dom";


const routine_list = require("../list_data.json");

function GoalList() {
  const listItems = routine_list.list.map((routine) =>
    <li>
      <Link to='/detail/'>{routine.title}</Link>
      <br />
      {routine.start_date} ~ {routine.start_date}
      <br />
      {routine.now_people_number}/{routine.max_people_number}
    </li>
  );
  return (
    <>
      <h1>Routine List</h1>
      <ul>
      {listItems}
      </ul>
      <h2><Link to="/" >목표 만들기</Link></h2>
    </>
  )
}

export default GoalList;
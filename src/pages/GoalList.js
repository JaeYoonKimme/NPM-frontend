import React from 'react';
import { Link } from "react-router-dom";
import RoutineContent from '../components/RoutineContent/RoutineContent';


const routine_list = require("../list_data.json");

function GoalList() {
  
  return (
    <>
      <h1>Routine List</h1>
      <ul>
        {
          routine_list.list.map((routine, idx) => 
          <RoutineContent key={idx} routine={routine}/>
          )
        }
      
      </ul>
      <h2><Link to="/" >목표 만들기</Link></h2>
    </>
  )
}

export default GoalList;
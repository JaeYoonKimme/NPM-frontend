import React from "react";
import { useNavigate } from "react-router-dom";

function RoutineContent({ routine }) {
  const navigate = useNavigate();
  const move = () => {
    navigate("/detail/" + routine.title, {
      state: {
        id: routine.id,
        title: routine.title,
        start_date: routine.start_date,
        end_date: routine.end_date,
        description: routine.description,
      },
    });
  };
  return (
    <li>
      <div onClick={move}>{routine.title}</div>
      {/* <Link to='/detail/'>{routine.title}</Link> */}
      <br />
      {routine.start_date} ~ {routine.start_date}
      <br />
      {routine.now_people_number}/{routine.max_people_number}
    </li>
  );
}

export default RoutineContent;

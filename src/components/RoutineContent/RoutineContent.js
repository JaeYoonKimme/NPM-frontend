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
        max_count: routine.max_count,
      },
    });
  };
  return (
    <div style={{ margin: "1.2rem 0" }}>
      <div onClick={move}>{routine.title}</div>
      {/* <Link to='/detail/'>{routine.title}</Link> */}
      <div>
        {routine.start_date} ~ {routine.end_date}
      </div>
      <div>
        {routine.now_people_number}/{routine.max_people_number}
      </div>
    </div>
  );
}

export default RoutineContent;

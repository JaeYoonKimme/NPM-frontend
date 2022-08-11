import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoutineContent from "../components/RoutineContent/RoutineContent";
import axios from "axios";

function RoutineList() {
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL+"/api/routine/")
      .then((res) => {
        setRoutines([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div style={{ fontSize: "3em" }}>Routine List</div>
      <div>
        {routines.map((routine, idx) => (
          <RoutineContent key={idx} routine={routine} />
        ))}
      </div>
      <button>
        <Link to="/create">목표 만들기</Link>
      </button>
    </>
  );
}

export default RoutineList;
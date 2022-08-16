import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoutineContent from "../components/RoutineContent/RoutineContent";
import RoutineCreate from "../components/RoutineCreate/RoutineCreate";
import axios from "axios";
import Modal from "react-modal";

function RoutineList() {
  const [routines, setRoutines] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    axios
      .get("http://"+process.env.REACT_APP_API_URL+"/api/routine/", {
        params: {
          status: "active"
        },
      })
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
      <button onClick={() => setModalIsOpen(true)}>목표 만들기</button>
      <Modal isOpen={modalIsOpen} ariaHideApp={false}>
        <RoutineCreate setModalIsOpen={setModalIsOpen} />
      </Modal>
    </>
  );
}

export default RoutineList;

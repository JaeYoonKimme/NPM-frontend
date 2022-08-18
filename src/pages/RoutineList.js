import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoutineContent from "../components/RoutineContent/RoutineContent";
import RoutineCreate from "../components/RoutineCreate/RoutineCreate";
import axios from "axios";
import { Card, Button, Form, Modal, Col, Row, Container } from 'react-bootstrap';


function RoutineList({info}) {
  const [routines, setRoutines] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClose = () => setModalIsOpen(false);
  const handleShow = () => setModalIsOpen(true);

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
    <Container style={{ width: '50rem' }}>
      <Row className="justify-content-md-center">
          {routines.map((routine, idx) => (
            <RoutineContent key={idx} routine={routine} />
          ))}
      </Row>
      <Button variant="outline-info" onClick={() => setModalIsOpen(true)}>목표 만들기</Button>
      <Modal show={modalIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>목표 생성하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoutineCreate info={info} setModalIsOpen={setModalIsOpen} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default RoutineList;

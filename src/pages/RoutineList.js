import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoutineContent from "../components/RoutineContent/RoutineContent";
import RoutineCreate from "../components/RoutineCreate/RoutineCreate";
import axios from "axios";
import { Card, Button, Form, Modal, Col, Row, Container } from 'react-bootstrap';


function RoutineList({ isLogin, info }) {
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
    <>
    <div style={{ marginTop : 20 }}>
    <Col md={{ span: 10, offset: 10 }}>
      {isLogin ? (<Button variant="success" onClick={() => setModalIsOpen(true)}>목표 만들기</Button>) : (<></>)}
    </Col>
    </div>
    <Modal show={modalIsOpen} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>목표 생성하기</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <RoutineCreate setModalIsOpen={setModalIsOpen} info={info} />
      </Modal.Body>
    </Modal>
    <Container style={{ width: '50rem' }}>
    <Row xs={1} md={2} className="g-4">
      {routines.map((routine, idx) => (
        <Col>
            <RoutineContent key={idx} routine={routine} text="참가하기" />
        </Col>
      ))}
    </Row>
    </Container>
    </>
  );
}

export default RoutineList;

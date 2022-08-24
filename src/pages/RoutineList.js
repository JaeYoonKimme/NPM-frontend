import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoutineContent from "../components/RoutineContent/RoutineContent";
import RoutineCreate from "../components/RoutineCreate/RoutineCreate";
import axios from "axios";
import {
  Card,
  Button,
  Form,
  Modal,
  Col,
  Row,
  Container,
  ButtonGroup,
  Badge,
  ToggleButton
} from "react-bootstrap";

function RoutineList({ isLogin, info }) {
  const [routines, setRoutines] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClose = () => setModalIsOpen(false);
  const handleShow = () => setModalIsOpen(true);
  const [radioValue, setRadioValue] = useState("1");

  const radios = [
    { name: "대기중", value: "1" },
    { name: "진행중", value: "2" },
  ];

  useEffect(() => {
    axios
      .get("http://" + process.env.REACT_APP_API_URL + "/api/routine/", {
        params: {
          status: "ready active",
        },
      })
      .then((res) => {
        setRoutines([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container style={{ width: "50rem" }}>
      <Row>
        <Col xs lg="3" style={{margin: '1.5rem 0'}}>
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={idx % 2 ? "outline-danger" : "outline-success"}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </Col>
        <Col xs lg="6"/>
        <Col xs lg="3" style={{ display:'flex', justifyContent: 'end', margin: '1.5rem 0'}}>
          {isLogin && (
            <Button variant="success" onClick={() => setModalIsOpen(true)}>
              목표 만들기
            </Button>
          )}
        </Col>
      <Modal show={modalIsOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>목표 생성하기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RoutineCreate setModalIsOpen={setModalIsOpen} info={info} />
        </Modal.Body>
      </Modal>
      <Container>
        {radioValue === "1" ? (
          <Row xs={1} md={2} className="g-4">
            {routines.map((routine, idx) => {
              if (routine.status === "ready") {
                return <Col><RoutineContent key={idx} routine={routine} /></Col>;
              }
            })}
          </Row>
        ) : (
          <Row xs={1} md={2} className="g-4">
            {routines.map((routine, idx) => {
              if (routine.status === "active") {
                return <Col><RoutineContent key={idx} routine={routine} /></Col>;
              }
            })}
          </Row>
        )}
      </Container>
      </Row>
    </Container>
  );
}

export default RoutineList;

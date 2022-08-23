import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RoutineContent from "../components/RoutineContent/RoutineContent";
import RoutineCreate from "../components/RoutineCreate/RoutineCreate";
import axios from "axios";
import { Card, Button, Form, Modal, Col, Row, Container } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ButtonGroup from 'react-bootstrap/ButtonGroup';



function RoutineList({ isLogin, info }) {
  const [routines, setRoutines] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const handleClose = () => setModalIsOpen(false);
  const handleShow = () => setModalIsOpen(true);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: '진행중', value: '1' },
    { name: '대기중', value: '2' },
  ];


  useEffect(() => {
    axios
      .get("http://"+process.env.REACT_APP_API_URL+"/api/routine/", {
        params: {
          status: ["ready","active"]
        },
      })
      .then((res) => {
        setRoutines([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
   {/* <button onclick= {setBadge(1)} class="btn btn-primary">Primary </button> */}
   <div style={{ marginTop : 20 }}>
    <div style={{ marginLeft : 20 }}>
      <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={idx % 2 ? 'outline-success' : 'outline-danger'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e) => setRadioValue(e.currentTarget.value)}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>  
    </div>

    {/* <span onclick= "alert('tt')" class="label label-default">전체보기</span>
    <span onclick = {setBadge(true)} class="label label-default">진행중</span> */}

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

   {console.log(radioValue)}
    {
         radioValue==='1' ?(
          <Row xs={1} md={2} className="g-4">
          {routines.map((routine, idx) => {
            if(routine.status === "active") {
              return <RoutineContent key={idx} routine={routine} />
            }
          })}
         </Row>
          ) : (
          <Row xs={1} md={2} className="g-4">
          {routines.map((routine, idx) => {
            if(routine.status === "ready") {
              return <RoutineContent key={idx} routine={routine} />
            }
          })}
          </Row>
          )
     }
    </>

    /* <Container>
            <Row xs={1} md={2} className="g-4">
                {routines.map((routine, idx) => {
                  if(routine.status === "completed") {
                    return <RoutineContent key={idx} routine={routine} />
                  }
                })}
            </Row>
          </Container> */

// return (
//   <Container>
//      <Row xs={1} md={2} className="g-4">
//          {routines.map((routine, idx) => {
//            if(routine.status === "active") {
//              return <RoutineContent key={idx} routine={routine} />
//            }
//          })}
//      </Row>
//    </Container>
//   )
  

  );
}

export default RoutineList;

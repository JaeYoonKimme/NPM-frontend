import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import UserRoutine from "../components/UserRoutine/UserRoutine";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function Mypage({isLogin, info}) {
  const navigate = useNavigate();
  if (!isLogin) navigate('/');
  
  const [routines, setRoutines] = useState([]);
  

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
    <Tabs
      defaultActiveKey="active"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="active" title="진행중인 목표">
        <Container>
          <Row xs={1} md={2} className="g-4">
              {routines.map((routine, idx) => (
                  <UserRoutine key={idx} routine={routine} />
                ))}
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="completed" title="완료된 목표">
        <Container>
          <Row xs={1} md={2} className="g-4">
              {routines.map((routine, idx) => (
                  <UserRoutine key={idx} routine={routine} />
                ))}
          </Row>
        </Container>
      </Tab>
    </Tabs>
    
  );
}

export default Mypage;
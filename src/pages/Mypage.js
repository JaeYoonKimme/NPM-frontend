import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import RoutineContent from "../components/RoutineContent/RoutineContent";
import axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';


function Mypage({isLogin, info}) {
  const navigate = useNavigate();
  if (!isLogin) navigate('/');
  
  const [routines, setRoutines] = useState([]);

  useEffect(() => {
    axios
      .get("https://"+process.env.REACT_APP_API_URL+`/api/user_routine_list/${info.pk}`, {
      })
      .then((res) => {
        setRoutines([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
  <>
    <div style={{ marginTop : 50 }}></div>
    <Container style={{ width: '50rem' }}>
      <Tabs defaultActiveKey="progress" id="uncontrolled-tab-example" className="mb-3" >
        <Tab eventKey="progress" title="진행중인 목표">
          <Container>
            <Row xs={1} md={2} className="g-4">
                {routines.map((routine, idx) => {
                  if(routine.status === "active") {
                    return <RoutineContent key={idx} routine={routine} />
                  }
                })}
            </Row>
          </Container>
        </Tab>
        <Tab eventKey="completed" title="완료된 목표">
          <Container>
            <Row xs={1} md={2} className="g-4">
                {routines.map((routine, idx) => {
                  if(routine.status === "completed") {
                    return <RoutineContent key={idx} routine={routine} />
                  }
                })}
            </Row>
          </Container>
        </Tab>
      </Tabs>
    </Container>
    </>
  );
}

export default Mypage;
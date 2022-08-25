import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Row, Col, Tab, Tabs } from "react-bootstrap";
import RoutineContent from "../components/RoutineContent/RoutineContent";

function Mypage({ isLogin, info, header }) {
  const navigate = useNavigate();
  if (!isLogin) navigate("/");

  const [routines, setRoutines] = useState([]);
  const pk = info.pk;

  useEffect(() => {
    axios
      .get(
        "https://" +
          process.env.REACT_APP_API_URL +
          `/api/user_routine_list/${pk}`,
        {
          headers: header,
        }
      )
      .then((res) => {
        setRoutines([...res.data]);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <div style={{ marginTop: 50 }}></div>
      <Container style={{ width: "50rem" }}>
        <Tabs
          defaultActiveKey="progress"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="progress" title="진행중인 목표">
            <Container>
              <Row xs={1} md={2} className="g-4">
                {routines.map((routine, idx) => {
                  if (
                    routine.status === "active" ||
                    routine.status === "ready"
                  ) {
                    return (
                      <Col>
                        <RoutineContent key={idx} routine={routine} />
                      </Col>
                    );
                  }
                })}
              </Row>
            </Container>
          </Tab>
          <Tab eventKey="completed" title="완료된 목표">
            <Container>
              <Row xs={1} md={2} className="g-4">
                {routines.map((routine, idx) => {
                  if (routine.status === "completed") {
                    return (
                      <Col>
                        <RoutineContent key={idx} routine={routine} />
                      </Col>
                    );
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

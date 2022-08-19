import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col, Row, CardGroup, ListGroup } from 'react-bootstrap';

function RoutineContent({ routine }) {
  const navigate = useNavigate();
  const move = () => {
    navigate("/detail/" + routine.title, {
      state: {
        id: routine.id,
        title: routine.title,
        now_people_number: routine.now_people_number,
        max_people_number: routine.max_people_number,
        start_date: routine.start_date,
        end_date: routine.end_date,
        description: routine.description,
        now_count: routine.now_count,
        max_count: routine.max_count,
      },
    });
  };
  return (
    <>
      <Card style={{ width: '23rem'}}>
        <Card.Body>
          <Card.Title>{routine.title}</Card.Title><br />
          <Card.Subtitle className="mb-2 text-muted">{routine.start_date} ~ {routine.end_date}</Card.Subtitle>
          <Card.Text>{routine.description}</Card.Text>
          <Row>
            <Col xs={7}>
              참여 인원 : {routine.now_people_number} / {routine.max_people_number}
            </Col>
            <Col xs={5}>
              <Button variant="outline-warning" onClick={move}>들어가기</Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default RoutineContent;

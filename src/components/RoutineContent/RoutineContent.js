import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col, Row, Badge } from "react-bootstrap";
import { Person } from "react-bootstrap-icons";

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
        status: routine.status,
      },
    });
  };
  return (
    <>
      <Card style={{ width: "23rem", padding: "0.5rem" }}>
        <Card.Body>
          <Row>
            <Col xs lg="9">
              <Card.Title style={{ fontWeight: "bold", marginBottom: "1rem" }}>
                {routine.title}
              </Card.Title>
            </Col>
            <Col xs lg="3" style={{ display: "flex", justifyContent: "end" }}>
              {routine.status === "active" ? (
                <div>
                  <Badge pill bg="danger" text="light">
                    진행중
                  </Badge>
                </div>
              ) : (
                <div>
                  <Badge pill bg="success" text="light">
                    대기중
                  </Badge>
                </div>
              )}
            </Col>
          </Row>

          <Card.Subtitle className="mb-2 text-muted">
            {routine.start_date} ~ {routine.end_date}
          </Card.Subtitle>
          <Card.Text>{routine.description}</Card.Text>
          <Row>
            <Col xs lg={8} style={{ marginTop: "0.5rem" }}>
              <Person width={25} height={25} /> {routine.now_people_number} /{" "}
              {routine.max_people_number}
            </Col>
            <Col xs lg={4} style={{ display: "flex", justifyContent: "end" }}>
              <Button variant="outline-warning" onClick={move}>
                들어가기
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

export default RoutineContent;

import React from "react";
import { useNavigate } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function UserRoutine({ routine }) {
  const navigate = useNavigate();
  const move = () => {
    navigate("/detail/" + routine.title, {
      state: {
        id: routine.id,
        title: routine.title,
        start_date: routine.start_date,
        end_date: routine.end_date,
        description: routine.description,
        max_count: routine.max_count,
      },
    });
  };
  return (
    <div style={{ margin: "1.2rem 0" ,width: '30rem'}}>
      <Card>
        <Card.Header><div onClick={move}>{routine.title}</div></Card.Header>
        <Card.Body>
          <Card.Title>{routine.description}</Card.Title>
          <Card.Text>
            <div>
              {routine.start_date} ~ {routine.end_date}
            </div>
            <div>
              {routine.now_people_number}/{routine.max_people_number}
            </div>
          </Card.Text>
          <Button  className="row" variant="primary"><div onClick={move}>달성하기</div></Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default UserRoutine;

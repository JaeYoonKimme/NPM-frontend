import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Form,
  Modal,
  Button,
  ModalFooter,
  Col,
  Row,
  Toast,
} from "react-bootstrap";
import createMaxCount from "./CreateMaxCount.js";

export const Convert = (date, delimiter = "-") => {
  const leftPad = (value) => {
    if (value >= 10) {
      return value;
    }
    return `0${value}`;
  };

  const year = date.getFullYear();
  const month = leftPad(date.getMonth() + 1);
  const day = leftPad(date.getDate());

  return [year, month, day].join(delimiter);
};

function RoutineCreate({ info, setModalIsOpen }) {
  const [title, setTitle] = useState("");
  const [maxPeople, setMaxPeople] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxCount, setMaxCount] = useState(0);

  const StartSet = () => {
    return (
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        minDate={new Date()}
      />
    );
  };

  const EndSet = () => {
    return (
      <DatePicker
        dateFormat="yyyy-MM-dd"
        selected={endDate}
        onChange={(date) => {
          // console.log("date", date)
          setEndDate(date);
        }}
        minDate={startDate}
      />
    );
  };
  const navigate = useNavigate();

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setTitle(value);
    } else if (name === "max") {
      setMaxPeople(value);
    } else if (name === "desc") {
      setDescription(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://" + process.env.API_URL + "/api/routine/", {
        title: title,
        max_people_number: maxPeople,
        now_people_number: 1,
        description: description,
        start_date: Convert(startDate),
        end_date: Convert(endDate),
        max_count: createMaxCount(Convert(startDate), Convert(endDate)),
        status: "active",
      })
      .then((res) => {
        axios.post(
          "http://" + process.env.API_URL + "/api/user_routine/",
          {
            user_id: info.pk,
            routine_id: res.data.id,
            now_count: 0,
            max_count: createMaxCount(Convert(startDate), Convert(endDate)),
            is_host: "True",
          }
        );
        alert("목표 생성이 완료되었습니다!");
        navigate("/detail/" + title, {
          state: {
            id: res.data.id,
            title: title,
            max_people_number: maxPeople,
            now_people_number: 1,
            description: description,
            start_date: Convert(startDate),
            end_date: Convert(endDate),
            max_count: createMaxCount(Convert(startDate), Convert(endDate)),
            status: "active",
          },
        });
        setModalIsOpen(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>목표 제목</Form.Label>
        <Form.Control
          name="title"
          value={title}
          onChange={onChange}
          placeholder="목표 제목"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>최대 인원 수</Form.Label>
        <Form.Control
          name="max"
          value={maxPeople}
          onChange={onChange}
          placeholder="최대 인원 수"
          required
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>목표 설명</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="desc"
          value={description}
          onChange={onChange}
          placeholder="설명"
          required
        />
      </Form.Group>
      <Row>
        <Col xs={6}>
          <Form.Group className="mb-1" controlId="exampleForm.ControlInput1">
            <Form.Label>목표 시작 날짜</Form.Label>
            <StartSet />
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group className="mb-12" controlId="exampleForm.ControlInput1">
            <Form.Label>목표 종료 날짜</Form.Label>
            <EndSet />
          </Form.Group>
        </Col>
      </Row>
      <br />
      <ModalFooter>
        <Button variant="success" type="submit">
          생성하기
        </Button>
      </ModalFooter>
    </Form>
  );
}

export default RoutineCreate;

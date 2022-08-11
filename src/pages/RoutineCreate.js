import React, { useState } from "react";
import axios from "axios";

function RoutineCreate() {
  const [title, setTitle] = useState("");
  const [maxPeople, setMaxPeople] = useState(1);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxCount, setMaxCount] = useState(0);

  const onChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    if (name === "title") {
      setTitle(value);
    } else if (name === "max") {
      setMaxPeople(value);
    } else if (name === "desc") {
      setDescription(value);
    } else if (name === "start") {
      setStartDate(value);
    } else if (name === "end") {
      setEndDate(value);
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    axios
      .post(process.env.REACT_APP_API_URL+"/api/routine/", {
        title: title,
        max_people_number: maxPeople,
        now_people_number: 1,
        description: description,
        start_date: startDate,
        end_date: endDate,
        max_count: maxCount,
        status: "active",
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label>이름</label>
        <input
          name="title"
          value={title}
          onChange={onChange}
          placeholder="이름"
          required
        />
      </div>
      <div>
        <label>인원 수</label>
        <input
          name="max"
          value={maxPeople}
          onChange={onChange}
          placeholder="인원 수"
          required
        />
      </div>
      <div>
        <label>설명</label>
        <input
          name="desc"
          value={description}
          onChange={onChange}
          placeholder="설명"
          required
        />
      </div>
      <div>
        <label>시작 날짜</label>
        <input
          name="start"
          value={startDate}
          onChange={onChange}
          placeholder="시작 날짜"
          required
        />
      </div>
      <div>
        <label>종료 날짜</label>
        <input
          name="end"
          value={endDate}
          onChange={onChange}
          placeholder="종료 날짜"
          required
        />
      </div>
      <button type="submit">생성하기</button>
    </form>
  );
}

export default RoutineCreate;

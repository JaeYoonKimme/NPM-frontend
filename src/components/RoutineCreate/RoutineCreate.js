import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function RoutineCreate({setModalIsOpen}) {
  const [title, setTitle] = useState("");
  const [maxPeople, setMaxPeople] = useState(0);
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [maxCount, setMaxCount] = useState(0);

  const Convert=(date,delimiter='-')=>{
    const year = date.getFullYear();
    const month = leftPad(date.getMonth() + 1);
    const day = leftPad(date.getDate());

    return [year, month, day].join(delimiter);
  }

  const leftPad = (value)=> {
    if (value >= 10) {
        return value;
    }
    return `0${value}`;
  }

  const StartSet = () => {
    return (
      <DatePicker 
      dateFormat = "yyyy-MM-dd"
      selected={startDate} 
      onChange={
        date =>setStartDate(date) 
      } 
      minDate = {new Date()}
      />
    );
  };


  const EndSet = () => {
     return (
      <DatePicker 
      dateFormat = "yyyy-MM-dd"
      selected={endDate} 
      onChange={(date) => {
        // console.log("date", date)
        setEndDate(date)}}
      minDate= {startDate}
      />
    );
  };

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
      .post("http://127.0.0.1:8000/api/routine/", {
        title: title,
        max_people_number: maxPeople,
        now_people_number: 1,
        description: description,
        start_date: Convert(startDate),
        end_date: Convert(endDate),
        max_count: maxCount,
        status: "active",
      })
      .then((res) => {
        alert("생성 완료")
        setModalIsOpen(false)
        console.log(res)
      })
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
        <StartSet/>
      </div>
      <div>
        <label>종료 날짜</label>
        <EndSet/>
      </div>
        
      <button type="submit" >생성하기</button>

     
    </form>
  );
}

export default RoutineCreate;

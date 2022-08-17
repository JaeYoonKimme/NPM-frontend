import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalRoutine from "../components/PersonalRoutine/PersonalRoutine";

function RoutineDetail() {
  const [isEnterShow, setIsEnterShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [isCompleteShow, setIsCompleteShow] = useState(false);
  const [userRoutine, setUserRoutine] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;
  const title = location.state.title;
  const max_people_number = location.state.max_people_number;
  const now_people_number = location.state.now_people_number;
  const start_date = location.state.start_date;
  const end_date = location.state.end_date;
  const des = location.state.description;
  const max_count = location.state.max_count;
  const status = location.state.stauts;
  const [editTitle, setEditTitle] = useState(title);
  const [editDes, setEditDes] = useState(des);

  // 임시 user id
  const uid = "12345678";
  // const uid = "87654321";
  
  useEffect(() => {
    axios
      .get("http://" + process.env.REACT_APP_API_URL + "/api/user_routine/", {
        params: {
          user_id: uid,
          routine_id: id,
        },
      })
      .then((res) => {
        console.log(res);
        console.log(now_people_number);
        console.log(max_people_number);
        if (res.data === "" && now_people_number < max_people_number) {
          console.log("참가 버튼 open")
          setIsEnterShow(true);
        } else if (res.data.is_host === true) {
          setIsDeleteShow(true);
          setIsEditShow(true);
        }
        if (res.data !== "") {
          setUserRoutine(res.data);
        }
      });
  }, []);

  const onClickEnter = () => {
    axios
      .post("http://" + process.env.REACT_APP_API_URL + "/api/user_routine/", {
        user_id: uid,
        routine_id: id,
        now_count: 0,
        max_count: max_count,
        is_host: "False",
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsEnterShow(false);
    axios
      .patch("http://" + process.env.REACT_APP_API_URL + `/api/routine/${id}`, {
        now_people_number: now_people_number+1,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onClickDelete = () => {
    axios
      .patch("http://" + process.env.REACT_APP_API_URL + `/api/routine/${id}`, {
        status: "deleted",
      })
      .then(() => {
        alert("삭제되었습니다.");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const onClickEdit = () => {
    setIsEditShow(false);
    setEditInput(true);
    setIsCompleteShow(true);
  };

  const onClickComplete = () => {
    setIsCompleteShow(false);
    setIsEditShow(true);
    axios
      .patch("http://" + process.env.REACT_APP_API_URL + `/api/routine/${id}`, {
        title: editTitle,
        description: editDes,
      })
      .then(() => {
        alert("저장되었습니다.");
        navigate("/detail/" + editTitle, {
          state: {
            id: id,
            title: editTitle,
            max_people_number: max_people_number,
            now_people_number: now_people_number,
            description: editDes,
            start_date: start_date,
            end_date: end_date,
            max_count: max_count,
            status: status,
          },
        });
        setEditInput(false);
      })
      .catch((err) => console.log(err));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(editTitle, editDes);
  };

  const changeTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const changeDes = (e) => {
    setEditDes(e.target.value);
  };

  return (
    <>
      <h1>Detail</h1>
      {editInput ? (
        <form onSubmit={onSubmit}>
          <div>
            <h1>이름</h1>
            <input type="text" value={editTitle} onChange={changeTitle}></input>
          </div>
          <div>
            <h3>내용</h3>
            <input type="text" value={editDes} onChange={changeDes}></input>
          </div>
        </form>
      ) : (
        <>
          <h2>{title}</h2>
          <p>{des}</p>
        </>
      )}
      <div>
        {start_date} ~ {end_date}
      </div>
      {userRoutine !== null && <PersonalRoutine userRoutine={userRoutine} />}

      {isEnterShow && <button onClick={onClickEnter}>참가하기</button>}
      {isDeleteShow && <button onClick={onClickDelete}>삭제하기</button>}
      {isEditShow && <button onClick={onClickEdit}>수정하기</button>}
      {isCompleteShow && <button onClick={onClickComplete}>저장하기</button>}
    </>
  );
}

export default RoutineDetail;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalRoutine from "../components/PersonalRoutine/PersonalRoutine";

function RoutineDetail() { 
  const [isEnterShow, setIsEnterShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);
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
    console.log("user_id", uid);
    console.log("routine_id", id);
    axios
      .get("http://" + process.env.REACT_APP_API_URL + "/api/user_routine/", {
        params: {
          user_id: uid,
          routine_id: id,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.data === "") {
          setIsEnterShow(true);
        } else if (res.data.is_host === false) {
          setIsDeleteShow(false);
          setIsEditShow(false)
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

  const onEdit = () => {
    setIsEditShow(false);
    setIsCompleteShow(true);
  };

  const onComplete = () => {
    setIsCompleteShow(false);
    setIsEditShow(true);
    axios
    .patch("http://" + process.env.REACT_APP_API_URL + `/api/routine/${id}`, {
      title : editTitle,
      description : editDes,
    })
    .then(() => {
      alert("저장되었습니다.");
      navigate("/detail/"+editTitle, {
        state:{
          id:id,
          title:editTitle,
          max_people_number:max_people_number,
          now_people_number: now_people_number,
          description: editDes,
          start_date: start_date,
          end_date: end_date,
          max_count: max_count,
          status: status
        }
      });
    })
    .catch((err) => console.log(err));
  };


  const onSubmit = (e) => {
    e.preventDefault();
    console.log(editTitle, editDes);
  }

  const changeTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const changeDes = (e) => {
    setEditDes(e.target.value);
  };

  const onClickEdit = () => {};

  return (
    <>
      <h1>Detail</h1>
      {isEditShow ? (
        <>
          <h2>{title}</h2>
          <p>{des}</p>
        </>
      ) : (
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
      )}
      <div>
        {start_date} ~ {end_date}
      </div>
      {
        userRoutine !== null && <PersonalRoutine userRoutine={userRoutine} />
      }
      {isEnterShow && <button onClick={onClick}>참가하기</button>}
      {isDeleteShow && <button onClick={onDelete}>삭제하기</button>}
      {isEditShow && <button onClick={onEdit}>수정하기</button>}
      {isCompleteShow && <button onClick={onComplete}>저장하기</button>}
    </>
  );
}

export default RoutineDetail;

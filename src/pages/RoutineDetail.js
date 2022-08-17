import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PersonalRoutine from "../components/PersonalRoutine/PersonalRoutine";

function RoutineDetail() {
  const [isEnterShow, setIsEnterShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);
  const [userRoutine, setUserRoutine] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const id = location.state.id;
  const title = location.state.title;
  const start_date = location.state.start_date;
  const end_date = location.state.end_date;
  const des = location.state.description;
  const max_count = location.state.max_count;


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
        } else if (res.data.is_host === true) {
          setIsDeleteShow(true);
        } else if (res.data !== "") {
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
  const onClickEdit = () => {};

  return (
    <>
      <h1>Detail</h1>
      <h2>{title}</h2>
      <p>{des}</p>
      <div>
        {start_date} ~ {end_date}
      </div>
      {
        userRoutine !== null && <PersonalRoutine userRoutine={userRoutine} />
      }
      {isEnterShow && <button onClick={onClickEnter}>참가하기</button>}
      {isDeleteShow && <button onClick={onClickDelete}>삭제하기</button>}
      {isEditShow && <button onClick={onClickEdit}>수정하기</button>}
    </>
  );
}

export default RoutineDetail;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

function RoutineDetail() {
  const [isShown, setIsShown] = useState(false);

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
          setIsShown(true);
        }
      });
  }, []);

  const onClick = () => {
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
    setIsShown(false);
  };

  return (
    <>
      <h1>Detail</h1>
      <h2>{title}</h2>
      <p>{des}</p>
      <p>
        {start_date} ~ {end_date}
      </p>
      {isShown && <button onClick={onClick}>참가하기</button>}
    </>
  );
}

export default RoutineDetail;

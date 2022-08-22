import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import PersonalRoutine from "../components/PersonalRoutine/PersonalRoutine";
import { Convert } from "../components/RoutineCreate/RoutineCreate";
import createMaxCount from "../components/RoutineCreate/CreateMaxCount";
import animationData from "../lottie/63272-walking-avocado";
import otherAnimationData from "../lottie/0z0tZic8y3";

function RoutineDetail({ isLogin, info }) {
  const [isEnterShow, setIsEnterShow] = useState(false);
  const [isDeleteShow, setIsDeleteShow] = useState(false);
  const [isEditShow, setIsEditShow] = useState(false);
  const [editInput, setEditInput] = useState(false);
  const [isCompleteShow, setIsCompleteShow] = useState(false);
  const [isComeOutShow, setIsComeOutShow] = useState(false);
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
  const dDay = createMaxCount(Convert(new Date()), end_date) - 1;
  const [addNowPeople, setAddNowPeople] = useState(now_people_number);
  const [editTitle, setEditTitle] = useState(title);
  const [editDes, setEditDes] = useState(des);
  const [routines, setRoutines] = useState([]);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    axios
      .get(`http://${process.env.REACT_APP_API_URL}/api/all_user_routines/`, {
        params: {
          routine_id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        setRoutines([...res.data]);
      })
      .catch((err) => console.log(err));
    if (dDay < 0) {
      setIsEnd(true);
      axios.patch(`http://${process.env.REACT_APP_API_URL}/api/routine/${id}`, {
        status: "completed",
      });
    }
  }, []);

  useEffect(() => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let date = now.getDate();
    const today = `${year}-${month}-${date}`;
    axios
      .get("http://" + process.env.REACT_APP_API_URL + "/api/user_routine/", {
        params: {
          user_id: info.pk,
          routine_id: id,
        },
      })
      .then((res) => {
        if (res.data === "" && now_people_number < max_people_number) {
          if (start_date > today) {
            setIsEnterShow(true);
          } else {
            setIsEnterShow(false);
          }
        } else if (res.data.is_host === true) {
          if (start_date > today) {
            setIsDeleteShow(true);
            setIsEditShow(true);
          } else {
            setIsDeleteShow(false);
            setIsEditShow(false);
          }
        }
        if (res.data !== "") {
          setUserRoutine(res.data);
          // 나가기 버튼 활성화
          if (res.data.is_host === false && start_date > today) {
            setIsComeOutShow(true);
          }
        }
      });
  }, [addNowPeople, info]);

  const onClickEnter = () => {
    // POST user_routine data
    axios
      .post("http://" + process.env.REACT_APP_API_URL + "/api/user_routine/", {
        user_id: info.pk,
        routine_id: id,
        now_count: 0,
        max_count: max_count,
        is_host: "False",
        profile_url: info.profile_url,
        username: info.username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // 참가하기 버튼 없애고 현재 인원 +1
    setIsEnterShow(false);
    alert("참가 완료");
    setAddNowPeople(addNowPeople + 1);

    // PATCH routine data (now_people_number)
    axios
      .patch("http://" + process.env.REACT_APP_API_URL + `/api/routine/${id}`, {
        now_people_number: now_people_number + 1,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const onClickDelete = () => {
    // PATCH routine data (status)
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
    // PATCH routine data (title, description)
    axios
      .patch("http://" + process.env.REACT_APP_API_URL + `/api/routine/${id}`, {
        title: editTitle,
        description: editDes,
      })
      .then(() => {
        alert("저장되었습니다.");
        // 변경사항 저장한 뒤 새로고침
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

  const changeTitle = (e) => {
    setEditTitle(e.target.value);
  };

  const changeDes = (e) => {
    setEditDes(e.target.value);
  };

  const onClickComeOut = () => {
    axios
      .delete(
        "http://" +
          process.env.REACT_APP_API_URL +
          `/api/user_routine_delete/${id}/${info.pk}`
      )
      .then((res) => {
        console.log(res);
        alert("나갔습니다.");
        navigate("/");
      });
  };

  return (
    <>
      {editInput ? (
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          <div>제목</div>
          <input type="text" value={editTitle} onChange={changeTitle}></input>
        </div>
      ) : (
        <div
          style={{
            textAlign: "center",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {title}
        </div>
      )}

      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            width: "28em",
            height: "9em",
            border: "1px solid black",
            margin: "1em",
          }}
        >
          <div style={{ fontSize: "36px", fontWeight: "bold" }}>
            {isEnd ? <>목표 종료</> : <>{`D-${dDay}`}</>}
          </div>
          <div>
            {start_date} ~ {end_date}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "10px",
            width: "28em",
            height: "9em",
            border: "1px solid black",
            margin: "1em",
          }}
        >
          {editInput ? (
            <div>
              <div>설명</div>
              <input type="text" value={editDes} onChange={changeDes}></input>
            </div>
          ) : (
            <div>{des}</div>
          )}
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        {addNowPeople} / {max_people_number}
      </div>
      {userRoutine != null && isLogin ? (
        <PersonalRoutine
          info={info}
          userRoutine={userRoutine}
          start_date={start_date}
          end_date={end_date}
          isShow={!isEnd}
          animationData={animationData}
        />
      ) : (
        <div
          style={{
            display: "flex",
            height: "9em",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isEnterShow ? (
            <Button variant="success" onClick={onClickEnter}>
              참가하기
            </Button>
          ) : (
            <>이 목표에 함께하려면 로그인 하세요!</>
          )}
        </div>
      )}
      <hr />
      {routines.map((routine, idx) => {
        if (routine.user_id != info.pk) {
          return (
            <PersonalRoutine
              userRoutine={routine}
              start_date={start_date}
              end_date={end_date}
              isShow={2}
              animationData={otherAnimationData}
            />
          );
        }
      })}
      {isDeleteShow && (
        <Button variant="success" onClick={onClickDelete}>
          삭제하기
        </Button>
      )}
      {isEditShow && (
        <Button variant="success" onClick={onClickEdit}>
          수정하기
        </Button>
      )}
      {isCompleteShow && (
        <Button variant="success" onClick={onClickComplete}>
          저장하기
        </Button>
      )}
      {isComeOutShow && (
        <Button variant="success" onClick={onClickComeOut}>
          나가기
        </Button>
      )}
    </>
  );
}

export default RoutineDetail;

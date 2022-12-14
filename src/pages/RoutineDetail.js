import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Container, Col, Row, Button, Badge } from "react-bootstrap";
import axios from "axios";
import PersonalRoutine from "../components/PersonalRoutine/PersonalRoutine";
import { Convert } from "../components/RoutineCreate/RoutineCreate";
import createMaxCount from "../components/RoutineCreate/CreateMaxCount";
import animationData from "../lottie/63272-walking-avocado";
import otherAnimationData from "../lottie/0z0tZic8y3";
import {
  Person,
  Pencil,
  PatchCheck,
  Trash3,
  BoxArrowRight,
} from "react-bootstrap-icons";

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
  const status = location.state.status;
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
    axios
      .get("http://" + process.env.REACT_APP_API_URL + "/api/user_routine/", {
        params: {
          user_id: info.pk,
          routine_id: id,
        },
      })
      .then((res) => {
        console.log(res.data);
        if (isLogin) {
          if (res.data !== "") {
            setUserRoutine(res.data);
          }
          if (status === "ready") {
            if (res.data === "") {
              if (now_people_number < max_people_number) {
                setIsEnterShow(true);
              }
            } else {
              if (res.data.is_host === true) {
                setIsDeleteShow(true);
                setIsEditShow(true);
              } else {
                setIsComeOutShow(true);
              }
            }
          } else {
            setIsEnterShow(false);
            setIsDeleteShow(false);
            setIsEditShow(false);
            setIsComeOutShow(false);
          }
        } else {
          setIsEnterShow(false);
          setIsDeleteShow(false);
          setIsEditShow(false);
          setIsComeOutShow(false);
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
        is_host: "false",
        profile_url: info.profile_url,
        username: info.username,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // ???????????? ?????? ????????? ?????? ?????? +1
    setIsEnterShow(false);
    alert("?????? ??????");
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
        alert("?????????????????????.");
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
    // PATCH routine data (title, description)
    axios
      .patch("http://" + process.env.REACT_APP_API_URL + `/api/routine/${id}`, {
        title: editTitle,
        description: editDes,
      })
      .then(() => {
        alert("?????????????????????.");
        // ???????????? ????????? ??? ????????????
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
        setIsCompleteShow(false);
        setIsEditShow(true);
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
        alert("???????????????.");
        navigate("/");
      });
  };

  return (
    <Container>
      <Row>
        <Col lg="4">
          <Link to="/list">
            <img
                alt="logo"
                src="/left-arrow.png"
                width="30"
                height="30"
                className="d-inline-block align-top"
              />
          </Link>
        </Col>
        <Col lg="4"></Col>
        <Col lg="4"></Col>
      </Row>
      <Row xs lg="8" className="justify-content-center">
        <Col xs lg="4">
          {editInput ? (
            <div
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                padding: "0.5rem",
              }}
            >
              <div>??????</div>
              <input
                type="text"
                value={editTitle}
                onChange={changeTitle}
                style={{
                  border: "1px solid",
                  borderRadius: 5,
                  boxShadow: "none",
                  padding: "0.5rem",
                }}
              ></input>
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                fontSize: "24px",
                fontWeight: "bold",
                margin: "1.5rem 0",
              }}
            >
              {title}
            </div>
          )}
        </Col>
      </Row>
      <Row xs lg="8" className="justify-content-center">
        <Col>
          <Row className="justify-content-center">
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
                margin: "0.5em",
              }}
            >
              <div style={{ fontSize: "36px", fontWeight: "bold" }}>
                {isEnd ? <>?????? ??????</> : <>{`D-${dDay}`}</>}
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
                margin: "0.5em",
              }}
            >
              {editInput ? (
                <div>
                  <div>??????</div>
                  <input
                    type="text"
                    value={editDes}
                    onChange={changeDes}
                    style={{
                      border: "1px solid",
                      borderRadius: 5,
                      boxShadow: "none",
                      height: "3rem",
                      width: "15rem",
                    }}
                  ></input>
                </div>
              ) : (
                <div>{des}</div>
              )}
            </div>
          </Row>
        </Col>
      </Row>
      <Row style={{ margin: "0.5em" }} className="justify-content-center">
        <Col xs lg="2"></Col>
        <Col xs lg="4" style={{ textAlign: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Person width={25} height={25} />
            <div style={{ marginLeft: "0.3rem" }}>
              {addNowPeople} / {max_people_number}
            </div>
          </div>
        </Col>
        <Col xs lg="2">
          <div style={{ display: "flex", justifyContent: "end" }}>
            {isEditShow && (
              <Button
                style={{
                  display: "flex",
                  margin: "0 1em",
                  width: "5rem",
                  height: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="success"
                size="sm"
                onClick={onClickEdit}
              >
                <Pencil />
                <div style={{ marginLeft: "0.3rem" }}>??????</div>
              </Button>
            )}
            {isCompleteShow && (
              <Button
                style={{
                  display: "flex",
                  margin: "0 1em",
                  width: "5rem",
                  height: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="success"
                size="sm"
                onClick={onClickComplete}
              >
                <PatchCheck />
                <div style={{ marginLeft: "0.3rem" }}>??????</div>
              </Button>
            )}
            {isDeleteShow && (
              <Button
                style={{
                  display: "flex",
                  width: "5rem",
                  height: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="danger"
                size="sm"
                onClick={onClickDelete}
              >
                <Trash3 />
                <div style={{ marginLeft: "0.3rem" }}>??????</div>
              </Button>
            )}
            {isComeOutShow && (
              <Button
                style={{
                  display: "flex",
                  width: "5.5rem",
                  height: "2rem",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                variant="danger"
                size="sm"
                onClick={onClickComeOut}
              >
                <BoxArrowRight />
                <div style={{ marginLeft: "0.3rem" }}>?????????</div>
              </Button>
            )}
          </div>
        </Col>
      </Row>
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
          {isLogin ? (
            isEnterShow ? (
              <Button variant="success" onClick={onClickEnter}>
                ????????????
              </Button>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Badge pill bg="danger" text="light">
                  ?????????
                </Badge>
                <div style={{ marginTop: "0.5rem" }}>
                  ????????? ????????? ???????????????.
                </div>
              </div>
            )
          ) : (
            <>??? ????????? ??????????????? ????????? ?????????!</>
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
    </Container>
  );
}

export default RoutineDetail;

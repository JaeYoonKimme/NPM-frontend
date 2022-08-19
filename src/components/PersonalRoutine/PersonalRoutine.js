import React, { useState, useEffect } from "react";
import { Container, Row, Col, ProgressBar, Button } from "react-bootstrap";
import axios from "axios";
import Lottie from "react-lottie";
import animationData from "../../lottie/63272-walking-avocado";
import profile from "../../img/profile.png";

function PersonalRoutine({ userRoutine, start_date, end_date }) {
  const id = userRoutine.id;
  const user_id = userRoutine.user_id;
  const routine_id = userRoutine.routine_id;
  const [nowCount, setNowCount] = useState(userRoutine.now_count);
  const max_count = userRoutine.max_count;
  const created_at = userRoutine.created_at;
  const updated_at = userRoutine.updated_at;

  const [changeValue, setChangeValue] = useState(
    Math.round((100 * nowCount) / max_count)
  );
  const [avocado, setAvocado] = useState((changeValue * 7) / 10);
  const [isButtonShow, setIsButtonShow] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const onClick = () => {
    axios
      .patch(
        `http://${process.env.REACT_APP_API_URL}/api/user_routine/${userRoutine.id}`,
        {
          now_count: nowCount + 1,
        }
      )
      setNowCount(nowCount + 1);
      setIsButtonShow(false);
  };

  useEffect(() => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let date = now.getDate();
    const today = `${year}-${month}-${date}`;
    if (start_date > today) {
      setIsButtonShow(false)
    } else if (nowCount === 0 && created_at === updated_at) {
      setIsButtonShow(true)
    } else if (updated_at === today) {
      setIsButtonShow(false);
    } else {
      setIsButtonShow(true);
    }
  }, []);

  useEffect(() => {
    setChangeValue((100 * nowCount) / max_count);
    setAvocado(((100 * (nowCount+1)) / max_count * 7) / 10);
  }, [nowCount])

  return (
    <Container>
      <Row>
        <div style={{ margin: "auto" }}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div style={{ width: "4rem", margin: "3rem auto 1rem" }}>
              <img
                style={{ borderRadius: "50%" }}
                src={profile}
                alt="profile"
                width={50}
                height={50}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "660px",
              }}
            >
              <div style={{ width: `${avocado}em` }}>
                <Lottie options={defaultOptions} height={100} width={100} />
              </div>
              <div style={{ width: "600px", margin: "0 0 0 60px" }}>
                <ProgressBar now={changeValue} />
              </div>
            </div>
            <div style={{ width: "4rem", margin: "5rem auto 1rem" }}>
              <div>
                {nowCount} / {max_count}
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              margin: "1.5rem",
              justifyContent: "center",
            }}
          >
            {isButtonShow ? (
              <Button onClick={onClick}>완료</Button>
            ) : (
              <Button variant="secondary" disabled>
                완료
              </Button>
            )}
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default PersonalRoutine;

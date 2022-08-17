import Lottie from "react-lottie";
import animationData from "../../lottie/63272-walking-avocado";
import { Container, Row, Col, ProgressBar } from "react-bootstrap";
import profile from "../../img/profile.png";

function PersonalRoutine({userRoutine}) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <Container>
      <Row>
        <div style={{ margin: "auto" }}>
          <div style={{display:'flex', flexDirection:'row'}}>
            <div style={{ width:'10%', margin: "3rem auto 1rem" }}>
              <img
                style={{ borderRadius: "50%" }}
                src={profile}
                alt="profile"
                width={50}
                height={50}
              />
            </div>
            <div style={{ width:'600px'}}>
              <div style={{ width: "6rem" }}>
                <Lottie options={defaultOptions} height={100} width={100} />
              </div>
              <ProgressBar now={10} />
            </div>
            <div style={{ width:'10%', margin: "5rem auto 1rem" }}>
              <div>{userRoutine.now_count} / {userRoutine.max_count}</div>
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
}

export default PersonalRoutine;

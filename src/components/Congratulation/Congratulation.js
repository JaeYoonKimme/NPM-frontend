import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import animationData from "../../lottie/lf30_P2wyYh.json";
import "react-datepicker/dist/react-datepicker.css";
import Lottie from "react-lottie";

import {
  Container,
} from "react-bootstrap";

function Congratulation() {

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
    };

  return (
    <Container>
    <Lottie options={defaultOptions}
      height={400}
      width={400} />
  </Container>
  );
}

export default Congratulation ;
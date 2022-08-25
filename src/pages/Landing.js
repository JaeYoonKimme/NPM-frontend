
import  React , { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SlidingTitle from '../components/SlidingTitle/SlidingTitle'
import { Container, Row, Col, Button } from 'react-bootstrap';

function Landing(){
    const [routines, setRoutines] = useState([]);
    const navigate = useNavigate();
    let rList = []
    useEffect(()=>{
        axios
        .get(`http://${process.env.REACT_APP_API_URL}/api/routine/`, {
            params: {
                status: "active"
              },
        })
        .then((res) => {
          setRoutines([...res.data]);
          
        })
        .catch((err) => console.log(err));
    }, [])
    for (let i=0;i < routines.length; i++){
        rList.push(routines[i].title)
    }
    
       
function goList(){
    navigate("/list")
}

return (
        <Container style={{ width: "40rem", height:'100vh' }}>
                <div style={{display:'flex', height: '80%', flexDirection:'column',  justifyContent: 'center', alignItems: 'center'}}>
                <h1>루틴 공유 서비스 : EROOMING</h1>
                <p>나의 루틴을 다른 사람들과 공유하며 동기부여를 받아요</p>
                <p>관심 가는 루틴을 클릭해보세요!</p>
                <SlidingTitle rList={rList} routines={routines}></SlidingTitle>
                
                <div style={{ marginTop: 20 }}></div>
                <Button onClick={goList}>목표 둘러보러 GO!</Button>
                </div>
        </Container>
    )
}

export default Landing;
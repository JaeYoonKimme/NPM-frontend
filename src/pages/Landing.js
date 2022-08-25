
import  React , { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import SlidingTitle from '../components/SlidingTitle/SlidingTitle'

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
    })
    for (let i=0;i < routines.length; i++){
        rList.push(routines[i].title)
    }
    
       
function goList(){
    navigate("/list")
}

return (
        <>
            <h1>Erooming</h1>
            <p>관심 가는 루틴을 클릭해보세요! </p>
            <SlidingTitle rList={rList} routines={routines}></SlidingTitle>
            <button onClick={goList}>목표 둘러보러 GO!</button>
        </>
    )
}

export default Landing;
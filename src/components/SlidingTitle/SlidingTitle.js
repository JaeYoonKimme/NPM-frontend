import React from "react";
import { useNavigate } from "react-router-dom";
import Marquee from "react-fast-marquee";


function SlidingTitle({ rList, routines }){
    const titles = rList;
    const navigate = useNavigate()

    const move = (r) => {
        let checkTitle = routines.filter( (val)=> val.title===r)
        navigate("/detail/" + checkTitle.title, {
            state: {
              id: checkTitle[0].id,
              title: checkTitle[0].title,
              now_people_number: checkTitle[0].now_people_number,
              max_people_number: checkTitle[0].max_people_number,
              start_date: checkTitle[0].start_date,
              end_date: checkTitle[0].end_date,
              description: checkTitle[0].description,
              now_count: checkTitle[0].now_count,
              max_count: checkTitle[0].max_count,
            },
          });
      };

    return (
    <>  
        <div>
            <Marquee direction="right" speed="50"  gradientWidth="0">
                {titles.map((name)=>(<button onClick={()=>move(name)}>{name}</button>))}
            </Marquee>
        </div>
    </>
    )
};

export default SlidingTitle;
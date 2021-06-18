import React from 'react';
import Timer from './Timer';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import ChangeDescription from './ChangeDescription';
import '../css/Goal.css'


const Goal = (props) => {
    const takeData = useLocation();
    const data = takeData.state;

    const history = useHistory();
    
    const handlegoToMyPageClick = () => {
        history.push('/user');
    };

    const handleReomveGoalClick = () => {
        if (window.confirm("힘들게 쌓인 값진 시간입니다.... 이렇게 포기하시겠어요? :(")) {
            axios
            .delete("http://localhost:4000/goals", {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
                data:{
                    goalName: data.goalName
                }
            }
            )
            .then(() => {
                history.push('/user');
            })
            .catch(e => alert(e));
        } else {
            return ;
        }
    };

    return (
        <div id="goal_container">
            <header>
            <button className="goal_button_form" onClick={handlegoToMyPageClick}>MyPage</button>
            <button className="goal_button_form" onClick={handleReomveGoalClick}>목표 지우기</button>
            </header>
            <h1 className="goal_title">{data.goalName}</h1>
            <ChangeDescription description={data.description} timesId={data.timesId} goalName={data.goalName} />
            <Timer timesId={data.timesId} accTime={data.accTime} totalTime ={data.totalTime} goalName={data.goalName} />
        </div>
    );
};

export default Goal;
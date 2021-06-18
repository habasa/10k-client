import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import InputNewGoal from './InputNewGoal';
import '../css/MyPage.css'


const MyPage = (props) => {

    const [newGoalList, setNewGoalList] = useState('');
    const [userInfo, setUserInfo] = useState({})
    const [times, setTimes] = useState([]) // times 여러개라서 빈 배열 골(개발, 요리 이런거..)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        axios
            .get("http://localhost:4000/user", {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            })
            .then((res) => {
                const { name, email, timesData } = res.data;
                setUserInfo({
                    'name': name,
                    'timesData': timesData,
                    'email': email
                });
                setTimes(timesData); // goalList가 들어간 state는 times이다.
                setIsLoading(false)
            })
            .catch(e => e);
    }, [newGoalList])

    //props.times의 값을 절대 변경해서는 안되고 사용만 해야한다
    // 근데 여기서는 요청을 안했다. 기억해둘것
    const showGoalList = () => {
        //goals의 리스트를 조회한 후 뿌려준다.
        const goals = times;
        const list = goals.map((el, i) => {
            return <li key={i}> <Link className="goals" to={{ // totaltime을 추가필요
                pathname: "/mypage/goal",
                state: {
                    timesId: el.timesId,
                    goalName: el.goalName,
                    accTime: el.acc_time,
                    totalTime: el.total_time,
                    description: el.description,
                }
            }}>{el.goalName} /{(el.acc_time / el.total_time * 100).toFixed(2)}%</Link> </li>
        });
        return <ul className="goal_list">{list}</ul>
    };

    const handleLogoutClick = () => {
        if (window.confirm("정말 로그아웃 하시겠어요?")) {
            axios
                .get("http://localhost:4000/signout", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                .then((res) => {
                    props.setLogin(false); // 로그아웃 상태로
                })
                .catch(e => e);
        } else {
            return;
        }
    };

    const handleWithdrawalClick = () => {
        if (window.confirm("회원탈퇴를 하면 저장된 정보가 모두 삭제됩니다. 정말 회원탈퇴를 하시겠어요? :(")) {
            axios
                .delete("http://localhost:4000/user", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                })
                .then((res) => {
                    props.setLogin(false); // 로그아웃 상태로
                })
                .catch(e => e);
        } else {
            return;
        }
    };

    return (
        <div className="mypage_container">
            {isLoading ?
                <div className="loading">
                    <div className="dim"></div>
                    <div className="circle"></div>
                </div> :

                <div className="mypage_div">
                    <button className="button_form" onClick={handleWithdrawalClick}>회원탈퇴</button>
                    <button className="button_form" onClick={handleLogoutClick}>로그아웃</button>
                    <div className="mypage_div1">
                        <h2 className="mypage_title">{userInfo.name}님의 목표 달성을 기원합니다!!</h2>
                    </div>
                    <InputNewGoal userInfo={userInfo} times={times} newGoalList={newGoalList} setNewGoalList={setNewGoalList}
                         setTimes={setTimes} />
                    {showGoalList()}
                </div>
            }
        </div>
    );
};

export default MyPage;
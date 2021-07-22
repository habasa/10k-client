import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../css/Timer.css'

const Timer = (props) => {
    const [time, setTime] = useState(0)
    const [curAccTime, setCurAccTime] = useState(props.accTime)
    const [isRunning, setIsRunning] = useState(false)
    // math함수써서 시분초로 나타내기

    const saveTime = () => {
        axios.post("http://localhost:4000/goals/time", {
            goalName: props.goalName,
            time: String(time)
        }, {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        }).then((res) => {
            setCurAccTime(res.data.accTime)
            setTime(0)
        })
    }

    useEffect(() => {
        let interval = null
        if (isRunning) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1)
            }, 1000);
        } else {
            clearInterval(interval)
        }
        return () => clearInterval(interval)
    }, [isRunning])
    // isrunning상태가 변할때만 useffect 실행
    // https://squll1.tistory.com/entry/javascript-setTimeout-setInterval-clearInterval
    // start버튼 누르면 isRunning 상태가 변하므로 useEffect가 실행됨.
    // setInterval함수에 의해서 1초간격으로 setInterval 출력. 1..2..3..4..5..
    // stop버튼 누르면 다시 isRunning의 상태가 false로 되므로, useEffect다시 실행. interval값이 null이 되고
    // isRunning이 false이므로 조건문에 의해서 clearInterval함수 실행되면서 setinterval함수가 
    // 반복하고 있는걸 중지.
    return (
        <div id="timer_container">
            <div className="timer_div">
                <span className="timerfont">{("0" + Math.floor(time / 3600)).slice(-2)}:</span>
                <span className="timerfont">{("0" + Math.floor(time / 60) % 60).slice(-2)}:</span>
                <span className="timerfont">{("0" + (time) % 60).slice(-2)}</span> 
            </div>
            <div className="timer_div">
                <button className="timer_button" onClick={() => setIsRunning(true)}>Start</button>
                <button className="timer_button" onClick={() => setIsRunning(false)}>Stop</button>
                <button className="timer_button" onClick={() => setIsRunning(true)}>Resume</button>
                <button className="timer_button" onClick={() => setTime(0)}>Reset</button>
                <button className="timer_button" onClick={saveTime}>Save</button>
            </div>
            <div className="timer_div">
                <span className="timer_title">누적시간 : {curAccTime}초</span>
            </div>
            <div className="timer_div">
            <span className="timer_title">목표시간 : {props.totalTime/3600}시간</span>
            <div className="timer_title_rate">달성률 : {(curAccTime/props.totalTime*100).toFixed(2)}% 입니다.</div>
            </div>
        </div>
    );
};

export default Timer;
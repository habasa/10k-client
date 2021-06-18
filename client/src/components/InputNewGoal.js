import React, {useMemo, useState} from 'react';
import axios from 'axios';
import Select from 'react-select';
import '../css/InPutNewGoal.css'

function InputNewGoal(props) {

    const [newGoalName, setNewGoalName] = useState('');
    const [desc, setDesc] = useState('');
    const [totalTime, setTotalTime] = useState('');

    const timeOptions = [
        { value: 36000, label: '10 hours', color:"orange"},
        { value: 360000, label: '100 hours', color: "skyblue" },
        { value: 3600000, label: '1000 hours', color: "orange" },
        { value: 36000000, label: '10K hours', color: "skyblue" }
      ];


    const goalOptions = [
        { value: '개발', label: '개발🧑‍💻', color: "orange" },
        { value: '수영', label: '수영🏊‍♂️', color: "skyblue" },
        { value: '마라톤', label: '마라톤🏃‍♂️', color: "orange" },
        { value: '헬스', label: '헬스💪', color: "skyblue" },
        { value: '그림', label: '그림🎨', color: "orange" },
        { value: '게임', label: '게임🎮', color: "skyblue" },
        { value: '독서', label: '독서📚', color: "orange" },
        { value: '공부', label: '공부📑', color: "skyblue" },
        { value: '농구', label: '농구🏀', color: "orange" },
        { value: '프로젝트', label: '프로젝트💻', color: "skyblue" },
      ];

      const customStyles = useMemo(
        () => ({
            option: (provided, state) => ({
                ...provided,
                border: "1px dotted black",
                color: 'black',
                backgroundColor: state.data.color,
                // opacity: 0.8,
                padding: 20,
              }),
          control: (provided) => ({
            ...provided,
            border: "2px solid pink",
            width: 300,
            background: "white",
          }),
          singleValue: (provided, state) => ({
            ...provided,
            color: state.data.color,
          }),
        }),
        []
      );

    const inputDesc = (e) => {
        setDesc(e.target.value);
    };

    const handleTimeChange = (totalTime) => {
        setTotalTime(totalTime);
    };

    const handleSelectGoal = (newGoalName) => {
        setNewGoalName(newGoalName);
    };

    const handleAddGoalClick = () => {
        if (newGoalName === '' || desc === '' || totalTime === '') {
            alert("모든 목표 이름, 목표 설명, 목표 시간을 모두 설정해주시기 바랍니다.");
        } else {
            axios
                .post("http://localhost:4000/goals", {
                    goalName: newGoalName.value,
                    description: desc,
                    email: props.userInfo.email,
                    totalTime: String(totalTime.value),
                    accTime: '0'
                },
                    {
                        headers: {
                            "Content-Type": "application/json"
                        },
                        withCredentials: true
                    })
                .then((res) => {
                    const newTimes = [...props.times];
                    newTimes.push(res);
                    props.setTimes(newTimes);
                    props.setNewGoalList(res) // 다시 렌더링을 하기 위해서
                    document.querySelector('.inputform').value = '';
                })
                .catch(e => e);
        }
    };

    return (<div>
                <Select placeholder={<div>목표 선택</div>} value={newGoalName} onChange={handleSelectGoal} options={goalOptions} styles={customStyles}></Select>
                <textarea className="inputform" placeholder="목표를 위한 다짐이나 세부사항을 간단하게 적어주세요" onChange={(e) => inputDesc(e)} />
                <Select placeholder={<div>목표 시간 선택</div>} value={totalTime} onChange={handleTimeChange} options={timeOptions} styles={customStyles}></Select>
                <button className="input_button_form" onClick={handleAddGoalClick}>목표 설정</button>
    </div>);
}

export default InputNewGoal
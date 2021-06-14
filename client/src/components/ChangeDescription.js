import React, { useState } from 'react';
import axios from 'axios';


function ChangeDescription(props) {

    const [curDesc, setCurDesc] = useState(props.description);
    const [descM, setDescM] = useState('');

    const makeNewDesc = (e) => {
        setDescM(e.target.value);
    }

    const handleDescChangeClick = () => {
        console.log(props)
        if (descM.length === 0) {
            alert('변경할 내용을 입력하세요!!!')
        } else {
            if (window.confirm("진짜 변경하시겠습니까?")) {
                axios
                    .put("http://localhost:4000/goals", {
                        goalName: props.goalName,
                        description: descM
                    },
                        {
                            headers: {
                                Authorization: `Bearar ${props.token}`,
                                "Content-Type": "application/json"
                            },
                            withCredentials: true
                        })
                    .then((res) => {
                        setCurDesc(descM);
                        document.getElementById('goalTextBox').value = ''
                    })
                    .catch(e => alert(e));
            } else {
                return;
            }
        }
    };

    return (<div>
        <p>{curDesc}</p>
        <textarea id="goalTextBox" placeholder='목표 설명을 변경하고 싶으시면 여기에 새 내용을 적으세요' onChange={makeNewDesc}></textarea>
        <button onClick={handleDescChangeClick}>목표 설명 변경</button>
    </div>);
}

export default ChangeDescription
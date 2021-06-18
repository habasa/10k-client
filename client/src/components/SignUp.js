import axios from 'axios';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../css/SignUp.css'

const SignUp = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordCheck, setPasswordCheck] = useState('') // 이건 요청ㄴㄴ
    const history = useHistory()

    const handleClick = () => {
        if(!name || !email || !password) {
            return alert('모든 항목을 작성하셔야 합니다.')
        } else if(password !== passwordCheck) {
            return alert('비밀번호 재확인 부탁드립니다.')
        }
        axios.post("http://theone10k.kro.kr/signup", {
            email: email,
            name: name,
            password: password
        }).then(() => {
            alert('회원가입이 완료되었습니다!!')
            history.push('/signin')})
        .catch((e) => alert(e))
    }

    return (
        <div>
            <header>
                <h1 id="signUp_title">회원가입</h1>
                </header>
            <div>
                <input className="signUp_inputform" type="text" placeholder="name" 
                onChange={(e) => setName(e.target.value)}></input>
            </div>
            <div>
                <input className="signUp_inputform" type="text" placeholder="email" 
                onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div>
                <input className="signUp_inputform" type="password" placeholder="password" 
                onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <div>
                <input className="signUp_inputform" type="password" placeholder="password check"
                onChange={(e) => setPasswordCheck(e.target.value)}></input>
            </div>
                <div><button className="signUp_button_form" onClick={handleClick}>회원가입하기!</button></div>
                <div><Link className="signUp_link" to="/signin">로그인 하러가기</Link></div>
        </div>
    );
};

export default SignUp;
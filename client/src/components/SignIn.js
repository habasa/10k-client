import React, { useState } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import '../css/SignIn.css'

const SignIn = (props) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async() => {
        if (!email || !password) {
            return alert('이메일과 비밀번호를 다 기입해주세요')
        }

        await axios.post("http://localhost:4000/signin", {
            email: email,
            password: password
        }).then((res) => {
            props.setToken(res.data.accessToken)
            props.setLogin(true)
        })
        .catch((err) => alert(err))
    }

    return (
        <div id="signin_container">
            <header>
                <h1 id="signIn_title">1만시간의 노력</h1>
                </header>
                <img id="main_img" src='https://cdn.pixabay.com/photo/2016/08/31/22/10/bicycling-1634728_1280.png' />
            <div className="signin_div">
                <input className="signIn_inputform" placeholder="Email" type="email" onChange={(e) => setEmail(e.target.value)}></input>
            </div>
            <div className="signin_div">
                <input className="signIn_inputform" placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)}></input>
            </div>
            <button className="signIn_button_form" type="submit" onClick={handleLogin}>Login</button>
            <div className="signin_div">
                <Link className="link" to="/signup">아이디가 없으신가요?</Link>
            </div>
        </div>
    );
};

export default SignIn;
import React, { useEffect, useState } from 'react'
import { Route, Redirect } from "react-router-dom"
import SignUp from './components/SignUp';
import SignIn from './components/SignIn'
import Goal from './components/Goal'
import MyPage from './components/MyPage'
import Timer from './components/Timer';


function App() {
  const [login, setLogin] = useState(false)
  // const [token, setToken] = useState('')

  // useEffect(() => {
  //   console.log('gg');
  // })


  return (
    <div className="App">
      <Route path='/signin'
        render={() => (
          <SignIn setLogin={setLogin} />
        )} />
      <Route path='/signup'
        render={() => (
          <SignUp />
        )} />

      <Route path='/user' render={() => <MyPage login={login} setLogin={setLogin} />} />
      <Route path='/mypage/goal' render={() => <Goal />} />
      <Route path='/timer' render={() => <Timer />} />

      <Route
        path='/'
        render={() => {
          if (document.cookie.includes('true')) {
            return <Redirect to='/user' />;
          }
          return <Redirect to='/signin' />;
        }}
      />
    </div>
  );
}

export default App;

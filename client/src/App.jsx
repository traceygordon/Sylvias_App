import { useState, useEffect } from 'react'

const Login = ( {login , register})=> {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submit = ev => {
    ev.preventDefault();
    login({ username, password });
  }

  const eventRegister = ev => {
    ev.preventDefault();
    register({ username, password });
  }

  return (
    <form>
      <input value={ username } placeholder='username' onChange={ ev=> setUsername(ev.target.value)}/>
      <input value={ password} placeholder='password' onChange={ ev=> setPassword(ev.target.value)}/>
      <button onClick={(event) => eventRegister(event)} disabled={ !username || !password }>Register</button>
      <button disabled={ !username || !password} onClick={(event)=> submit(event)}>Login</button>
    </form>
  );
}

function App() {
  const [auth, setAuth] = useState({});

  useEffect(()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      attemptLoginWithToken();
    }
  }, []);

  const attemptLoginWithToken = async()=> {
    const token = window.localStorage.getItem('token');
    if(token){
      const response = await fetch(`api/users/login`, {
        headers: {
          authorization: token
        }
      });
      const json = await response.json();
      if(response.ok){
        setAuth(json);
      }
      else {
        window.localStorage.removeItem('token');
      }
    }
  };

  const login = async(credentials)=> {
    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if(response.ok){
      window.localStorage.setItem('token', json.token);
      attemptLoginWithToken();
    }
    else {
      console.log(json);
    }
  };

  const register = async(credentials)=> {
    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      body: JSON.stringify(credentials),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();
    if(response.ok){
      window.localStorage.setItem('token', json.token);
      attemptLoginWithToken();
    }
    else {
      console.log(json);
    }
  };

  const logout = ()=> {
    window.localStorage.removeItem('token');
    setAuth({});
  };

  return (
    <>
      {
        !auth.id ? <Login login={ login } register={register}/> : <button onClick={ logout }>Logout { auth.username }</button>
      }
    </>
  )
}

export default App
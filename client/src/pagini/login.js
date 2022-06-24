import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


export default function Login({ onLoginCompleted }) {
  const [email, setEmail] = useState('hairstyle@gmail.com');
  const [password, setPassword] = useState('123');
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const navigate = useNavigate();

  const validateData = () => {
    if (!email) {
      setEmailError("Emailul este obligatoriu");
      return false;
    }
    if (!password) {
      setPasswordError("Campul Parola este obligatoriu");
      return false;
    }
    if (email.indexOf('@') == -1) {
      setEmailError("Emailul este gresit - lipseste @");
      return false;
    }

    return true;
  }

  function Exec() {
    if (!validateData()) return;


    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password
      })
    }


    fetch('/api/login', params)
      .then(response => response.json())
      .then(user => {
        if (user.error)
          alert('Eroare la login :' + user.error)
        else {
          window.connectedUser = user;
          onLoginCompleted(user);
          navigate('/users');
        }
      });

  }

  return (
    <>


      <form className='w-50 p-5 mx-auto'>

        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example1">Email address</label>
          <input type="email" id="form2Example1" className="form-control" placeholder="Enter email" 
            defaultValue={email}
            onChange={(e) => { setEmail(e.target.value); setEmailError(null) }} />
          {
            emailError && <div style={{ color: 'red', fontSize: '10pt' }}>{emailError}</div>
          }

        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" htmlFor="form2Example2">Password</label>
          <input type="password" id="form2Example2" className="form-control" placeholder="Enter password"
            value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(null) }} />
          {
            passwordError && <div style={{ color: 'red', fontSize: '10pt' }}>{passwordError}</div>
          }
        </div>

        {/* <!-- 2 column grid layout for inline styling --> */}
        <div className="row mb-4">
          <div className="col d-flex justify-content-center">
            {/* <!-- Checkbox --> */}
            <div className="form-check">
              <input className="form-check-input" type="checkbox" value="" id="form2Example31" defaultChecked={true} />
              <label className="form-check-label" htmlFor="form2Example31"> Remember me </label>
            </div>
          </div>

          <div className="col">
            {/* <!-- Simple link --> */}
            <a href="#!">Forgot password?</a>
          </div>
        </div>

        {/* <!-- Submit button --> */}

        <div className="text-center">
          <button type="button" className="btn btn-primary btn-block mb-4" onClick={() => Exec()} >Sign in</button>
        </div>

        {/* <!-- Register buttons --> */}
        <div className="text-center">
          <p>Not a member? <a href="/register">Register</a></p>


        </div>

      </form>

    </>
  )
}
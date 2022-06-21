import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react'

export default function Register() {

  const [nume, setNume] = useState('');
  const [cf, setCf] = useState('');
  const [id_cat, setId_cat] = useState('');
  const [categorii, setCategorii] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [emailError, setEmailError] = useState(null);
  const [numeError, setNumeError] = useState(null);
  const [id_catError, setId_catError] = useState(null);
  const [cfError, setCfError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [confirmPasswordError, setconfirmPasswordError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetch('/api/categorii')
      .then(response => response.json())
      .then(data => {
        setCategorii(data);
      });
  }, []);

  const validateData = () => {
    if (!nume) {
      setNumeError("Campul Nume este obligatoriu");
      return false;
    }
    if (!cf) {
      setCfError("Campul cf este obligatoriu");
      return false;
    }
    if (!id_cat) {
      setId_catError("Campul domeniu este obligatoriu");
      return false;
    }
    if (!email) {
      setEmailError("Campul Email este obligatoriu");
      return false;
    }
    if (!password) {
      setPasswordError("Campul Parola este obligatoriu");
      return false;
    }

    if (password.localeCompare(confirmPassword) != 0) {

      setconfirmPasswordError("Parolele nu sunt la fel");
      return false;
    }

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email.match(re)) {
      setEmailError("Adresa de email incorecta");
      return false;
    }

    // if (email.indexOf('@') == -1) {
    //   setEmailError("Emailul este gresit - lipseste @");
    //   return false;
    // }

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
        nume,
        cf,
        id_cat,
        email,
        password
      })
    }


    fetch('/api/register', params)
      .then(response => response.json())
      .then(user => {
        if (user.error)
          //window.alert("sometext");
          alert('Eroare la inregistrare :' + user.error)
        else {
          navigate('/login');
          alert('Inregistrarea a avut loc cu succes!')
        }
      });

  }

  return (
    <>


      <form className='w-50 p-5 mx-auto'>

        <h1>Inregistrare firma</h1>
        <br></br>


        <div className="form-outline mb-4">
          <label className="form-label">Nume firma</label>
          <input type="text" class="form-control" id="nume" placeholder=" exmplu S.R.L."
            value={nume} onChange={(e) => { setNume(e.target.value); setNumeError(null) }} />
          {
            numeError && <div style={{ color: 'red', fontSize: '10pt' }}>{numeError}</div>
          }
        </div>

        {/* <!-- Cf input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" >Cf</label>
          <input type="text" class="form-control" id="telefon" aria-describedby="emailHelp" placeholder="ro 123..."
            value={cf} onChange={(e) => { setCf(e.target.value); setCfError(null) }} />
          {
            cfError && <div style={{ color: 'red', fontSize: '10pt' }}>{cfError}</div>
          }

        </div>



        <div class="form-outline mb-4 ">
          <label className="form-label" >Domeniul de activitate</label>
          <select class="form-select w-100 " id="inputGroupSelect01" value={id_cat} onChange={(e) => { setId_cat(e.target.value); setId_catError(null) }} >
            <option selected>Alege un domeniu...</option>
            {
              categorii.map(c => {
                return <option key={c.id} value={c.id}>{c.nume}</option>;
              })
            }
          </select>
          {
            id_catError && <div style={{ color: 'red', fontSize: '10pt' }}>{id_catError}</div>
          }
        </div>


        {/* <!-- Email input --> */}
        <div className="form-outline mb-4">
          <label className="form-label" >Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
            value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(null) }} />
          {
            emailError && <div style={{ color: 'red', fontSize: '10pt' }}>{emailError}</div>
          }

        </div>

        {/* <!-- Password input --> */}
        <div className="form-outline mb-4">
          <label className="form-label">Password</label>
          <input type="password" id="password" className="form-control" placeholder="Enter password"
            value={password} onChange={(e) => { setPassword(e.target.value); setPasswordError(null) }} />
          {
            passwordError && <div style={{ color: 'red', fontSize: '10pt' }}>{passwordError}</div>
          }
        </div>

        <div className="form-outline mb-4">
          <label className="form-label">Confirm Password</label>
          <input type="password" id="confirmPassword" className="form-control" placeholder="Re Enter password"
            value={confirmPassword} onChange={(e) => { setconfirmPassword(e.target.value); setconfirmPasswordError(null) }} />
          {
            confirmPasswordError && <div style={{ color: 'red', fontSize: '10pt' }}>{confirmPasswordError}</div>
          }
        </div>



        {/* <!-- Submit button --> */}

        <div className="text-center">
          <button type="button" className="btn btn-success btn-block mb-4" onClick={() => Exec()} >Register</button>
        </div>


      </form>

    </>
  )
}
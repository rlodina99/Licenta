import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'


function EditForm({ user }) {

  const [nume, setNume] = useState(user.nume)
  const [prenume, setPrenume] = useState(user.prenume)
  const [email, setEmail] = useState(user.email)
  const [tel, setTel] = useState(user.tel)
  const [adresa, setAdresa] = useState(user.adresa)
  const [oras, setOras] = useState(user.oras)
  const [id_subCat, setId_subCat] = useState()
  const [subcategorii, setSubCategorii] = useState([]);

  const [telError, setTelError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [numeError, setNumeError] = useState(null);
  const [prenumeError, setPrenumeError] = useState(null);
  const [adresaError, setAdresaError] = useState(null);
  const [orasError, setOrasError] = useState(null);
  const [id_subCatError, setId_subCatError] = useState(null);

  useEffect(() => {
    fetch(`/api/subcategorii?id_cat=${window.connectedUser.id_cat}`)
      .then(response => response.json())
      .then(data => {
        setSubCategorii(data);
      });
  }, []);

  const validateData = () => {
    let hasError = false;
    if (!nume) {
      setNumeError("Campul Nume este obligatoriu");
      hasError = true;
    }
    if (!prenume) {
      setPrenumeError("Campul Prenume este obligatoriu");
      hasError = true;
    }
    if (!id_subCat) {
      setId_subCatError("Campul Specializare este obligatoriu");
      hasError = true;
    }
    if (!email) {
      setEmailError("Campul Email este obligatoriu");
      hasError = true;
    }
    if (!tel) {
      setTelError("Campul telefon este obligatoriu");
      hasError = true;
    }
    if (!adresa) {
      setAdresaError("Campul adresa este obligatoriu");
      hasError = true;
    }
    if (!tel) {
      setOrasError("Campul oras este obligatoriu");
      hasError = true;
    }

    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    if (!email.match(re)) {
      setEmailError("Adresa de email incorecta");
      hasError = true;
    }


    return !hasError;
  }

  const navigate = useNavigate();

  const submit = (e) => {

    if (!validateData()) return;

    e.preventDefault();

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: user.id,
        nume,
        prenume,
        email,
        tel,
        adresa,
        oras,
        id_subCat
      })
    }

    fetch('/api/editUser', params)
      .then(response => response.json())
      .then(data => {
        if (data.error)
          alert('Eroare la savale :' + data.error)
        else
          navigate('/users');
      });
  }

  return (

    <>

      <div class="container rounded bg-white mt-5 mb-5">
        <div class="row">

          <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg" /><span class="font-weight-bold">Exemplu Nume</span><span class="text-black-50">exemplu@gmail.com</span><span> </span></div>
          </div>

          <div class="col-md-5 border-right">
            <div class="p-3 py-5">

              <div class="d-flex justify-content-between align-items-center mb-3">
                <h4 class="text-right">Editare personal</h4>
              </div>

              <div class="row mt-2">
                {/* Numele */}
                <div class="col-md-6"><label class="labels">Nume</label>
                  <input type="text" class="form-control" id="nume" placeholder="nume angajat"
                    value={nume} onChange={(e) => { setNume(e.target.value); setNumeError(null) }} />
                  {
                    numeError && <div style={{ color: 'red', fontSize: '10pt' }}>{numeError}</div>
                  }</div>

                {/* Prenumele */}
                <div class="col-md-6"><label class="labels">Prenume</label>
                  <input type="text" class="form-control" id="nume" placeholder="prenume angajat"
                    value={prenume} onChange={(e) => { setPrenume(e.target.value); setPrenumeError(null) }} />
                  {
                    prenumeError && <div style={{ color: 'red', fontSize: '10pt' }}>{prenumeError}</div>
                  }
                </div>
              </div>

              {/* Telefon */}
              <div class="col-md-12"><label class="labels">Mobile Number</label>
                <input type="text" class="form-control" id="tel" aria-describedby="tel" placeholder="phone number"
                  value={tel} onChange={(e) => { setTel(e.target.value); setTelError(null) }} />
                {
                  telError && <div style={{ color: 'red', fontSize: '10pt' }}>{telError}</div>
                } </div>

              {/* Email */}
              <div class="col-md-12"><label class="labels">Email ID</label>
                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="enter email"
                  value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(null) }} />
                {
                  emailError && <div style={{ color: 'red', fontSize: '10pt' }}>{emailError}</div>
                }</div>

              {/* Adresa punct lucru */}
              <div class="col-md-12"><label class="labels">Adresa</label>
                <input type="text" class="form-control" id="adresa" aria-describedby="adresaHelp" placeholder="enter adresa"
                  value={adresa} onChange={(e) => { setAdresa(e.target.value); setAdresaError(null) }} />
                {
                  adresaError && <div style={{ color: 'red', fontSize: '10pt' }}>{adresaError}</div>
                }</div>

              {/* Oras */}
              <div class="col-md-12"><label class="labels">Oras</label>
                <input type="text" class="form-control" id="oras" aria-describedby="orasHelp" placeholder="enter oras"
                  value={oras} onChange={(e) => { setOras(e.target.value); setOrasError(null) }} />
                {
                  orasError && <div style={{ color: 'red', fontSize: '10pt' }}>{orasError}</div>
                }</div>



              <div class="col-md-12"><label class="labels">Specializare</label>
                <select class="form-select w-100 " id="inputGroupSelect01"
                  value={id_subCat} onChange={(e) => { setId_subCat(e.target.value); setId_subCatError(null) }} >
                  <option selected>alege o specializare...</option>
                  {
                    subcategorii.map(c => {
                      return <option key={c.id} value={c.id}>{c.nume}</option>;
                    })
                  }
                </select>
                {
                  id_subCatError && <div style={{ color: 'red', fontSize: '10pt' }}>{id_subCatError}</div>
                }</div>


              <div class="mt-5 text-center"><button type="button" className="btn btn-primary btn-block mb-5" onClick={(e) => submit(e)} >Salvare</button>
                &nbsp;
                <button type="cancel" class="btn btn-danger mb-5" onClick={() => navigate(`/users`)}>Cancel</button></div>
            </div>
          </div>

          <div class="col-md-4">
            <div class="p-3 py-5">
              <h4 class="text-right">Despre mine</h4>
              <div class="col-md-12"><label class="labels"></label><input type="text" class="form-control" placeholder="additional details" value="" /></div>
            </div>
          </div>

        </div>
      </div>

      {/* <form className='m-5 m'>
        <div class="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email"
            value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div class="form-group">
          <label htmlFor="nume">Nume</label>
          <input type="text" class="form-control" id="nume" placeholder="Nume user"
            value={nume} onChange={(e) => setNume(e.target.value)} />
        </div>
        <button type="submit" class="btn btn-primary mt-2" onClick={(e) => submit(e)}>Submit</button>
        &nbsp;
        <button type="cancel" class="btn btn-danger mt-2" onClick={(e) => submit(e)}>Cancel</button>
      </form> */}



    </>

  )
}


export default function EditUser(props) {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`/api/getUser?id=${id}`)
      .then(response => response.json())
      .then(data => {
        setUser(data);
      });
  }, [id])



  return (
    user
      ? <EditForm user={user} />
      : <h1>incarc datele ....</h1>

  )
}
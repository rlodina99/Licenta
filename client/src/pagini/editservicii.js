import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'


function EditServ({ user }) {

    const { idServiciu } = useParams();
    const [denumire, setDenumire] = useState()
    const [serviciu, setServiciu] = useState()
    const [durata, setDurata] = useState()
    const [pret, setPret] = useState()
    const [descriere, setDescriere] = useState()
    const [denumireError, setDenumireError] = useState(null);
    const [durataError, setDurataError] = useState(null);
    const [pretError, setPretError] = useState(null);

    useEffect(() => {
        fetch(`/api/serviciu?id_serviciu=${idServiciu}`)
          .then(response => response.json())
          .then(data => {
            if (data.length == 0) return;
            setDenumire(data[0].denumire)
            setDurata(data[0].durata)
            setPret(data[0].pret)
            setDescriere(data[0].descriere)

          });
      }, []);

    const navigate = useNavigate();

    const validateData = () => {
        let hasError = false;
        if (!denumire) {
            setDenumireError("Campul Nume este obligatoriu");
            hasError = true;
        }
        if (!durata) {
            setDurataError("Campul Prenume este obligatoriu");
            hasError = true;
        }
        if (!pret) {
            setPretError("Campul Specializare este obligatoriu");
            hasError = true;
        }


        return !hasError;
    }

    function Exec() {
        if (!validateData()) return;

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: idServiciu,
                denumire,
                descriere,
                pret,
                durata
            })
        }

        fetch('/api/editServ', params)
            .then(response => response.json())
            .then(data => {
                if (data.error)
                    alert('Eroare la salvare :' + data.error)
                else
                    navigate(`/users/${user.id}/servicii`);
            });
    }


    return (
        <form className='m-5 m'>

            <h1>
                {user.nume}
                &nbsp;
                {user.prenume}

            </h1>
            <h3>editare servicii </h3>
            <br></br>
            &nbsp;

            <div class="row mt-2">
                {/* Numele */}
                <div class="col-md-6">
                    <label class="labels">Denumire</label>
                    <input type="text" class="form-control" id="denumire" placeholder="denumire"
                        value={denumire} onChange={(e) => { setDenumire(e.target.value); setDenumireError(null) }} />
                    {
                        denumireError && <div style={{ color: 'red', fontSize: '10pt' }}>{denumireError}</div>
                    }</div>
            </div>

            <div class="row mt-2">
                {/* Numele */}
                <div class="col-md-6">
                    <label class="labels">Durata</label>
                    <input type="int" class="form-control" id="durata" placeholder="minute"
                        value={durata} onChange={(e) => { setDurata(e.target.value); setDenumireError(null) }} />
                    {
                        durataError && <div style={{ color: 'red', fontSize: '10pt' }}>{durataError}</div>
                    }</div>
            </div>

            <div class="row mt-2">
                {/* Numele */}
                <div class="col-md-6">
                    <label class="labels">Pret</label>
                    <input type="int" class="form-control" id="pret" placeholder="lei"
                        value={pret} onChange={(e) => { setPret(e.target.value); setPretError(null) }} />
                    {
                        pretError && <div style={{ color: 'red', fontSize: '10pt' }}>{pretError}</div>
                    }</div>
            </div>
            

            <div class="row mt-2">
            <div class="col-md-6">
                <label htmlFor="descriere">Descriere</label>
                <input type="text" class="form-control" id="descriere" placeholder="..."
                    value={descriere} onChange={(e) => setDescriere(e.target.value)} />
            </div>
            </div>

            <button type="button" class="btn btn-primary mt-2" onClick={() => Exec()}>Salvare</button>
            &nbsp;
            <button type="cancel" class="btn btn-danger mt-2" onClick={() => navigate(`/users/${user.id}/servicii`)}>Cancel</button>
        </form>
    )
}


export default function EditUser(props) {
    const { idUser } = useParams();
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetch(`/api/getUser?id=${idUser}`)
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });
    }, [idUser])



    return (
        user
            ? <EditServ user={user} />
            : <h1>incarc datele ....</h1>

    )
}
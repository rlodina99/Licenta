import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'


function AddServ({ user }) {
    const [denumire, setDenumire] = useState()
    const [durata, setDurata] = useState()
    const [pret, setPret] = useState()
    const [descriere, setDescriere] = useState()
    const [denumireError, setDenumireError] = useState(null);
    const [durataError, setDurataError] = useState(null);
    const [pretError, setPretError] = useState(null);


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
                id_users: user.id,
                id_subcategorie: user.id_subcat,
                denumire,
                descriere,
                pret,
                durata
            })
        }

        fetch('/api/addServ', params)
            .then(response => response.json())
            .then(data => {
                if (data.error)
                    alert('Eroare la savale :' + data.error)
                else
                    navigate(`/users/${user.id}/servicii`);
            });
    }


    return (
        <div class="container rounded bg-white mt-5 mb-5">

            <h1>
                Personal: {user.nume} {user.prenume}
            </h1>
            <h4>adaugare servicii </h4>
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
        </div>
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
            ? <AddServ user={user} />
            : <h1>incarc datele ....</h1>

    )
}
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';
import { Modal, Button } from 'react-bootstrap';


export default function DetaliuServici() {

    let navigate = useNavigate();
    const { idServiciu } = useParams();
    const [user, setUser] = useState();
    const [subcateg, setSubcateg] = useState();
    const [serviciu, setServiciu] = useState();
    const [datetime, setDateTime] = useState();
    const [showRed, setShowRed] = useState(false);
    const [showGreen, setShowGreen] = useState(false);
    const [show, setShow] = useState(false);
    
    var today = null, an = 0, luna = 0, ziua = 0, ora = 0, minutul = 0;

    var idx = false;

    const [nume, setNume] = useState('')
    const [prenume, setPrenume] = useState('')
    const [email, setEmail] = useState('')
    const [tel, setTel] = useState('')

    const [telError, setTelError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [numeError, setNumeError] = useState(null);
    const [prenumeError, setPrenumeError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseWarning = () => setShowRed(false);
    const handleShowWarning = () => setShowRed(true);


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

        if (!email) {
            setEmailError("Campul Email este obligatoriu");
            hasError = true;
        }
        if (!tel) {
            setTelError("Campul Telefon este obligatoriu");
            hasError = true;
        }

        const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if (!email.match(re)) {
            setEmailError("Adresa de email incorecta");
            hasError = true;
        }


        return !hasError;
    }

    function Exec() {

        console.log("Validez datele in Exec()");
        if (!validateData()) return;
        else handleClose();
        console.log("Datele sunt valide trimit POST");

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nume,
                prenume,
                email,
                tel,
                id_serviciu:idServiciu,
                id_users:user.id,
                data_programare:datetime

            })
        }

        fetch('/api/addProgramare', params)
            .then(response => response.json())
            .then(data => {
                if (data.error)
                    alert('Eroare la salvare :' + data.error)
                else
                    navigate('/');
            });
    }


    function Example() {

        

        return (
            <>


                <Modal show={show} >
                    <Modal.Header>
                        <Modal.Title>Rezervare {datetime}  </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <div className="row mt-2">
                            {/* Numele */}
                            <div className="col-md-6"><label className="labels">Nume</label>
                                <input type="text" className="form-control" id="nume" placeholder="nume client"
                                    value={nume} onChange={(e) => { setNume(e.target.value); setNumeError(null) }} />
                                {
                                    numeError && <div style={{ color: 'red', fontSize: '10pt' }}>{numeError}</div>
                                }</div>

                            {/* Prenumele */}
                            <div className="col-md-6"><label className="labels">Prenume</label>
                                <input type="text" className="form-control" id="nume" placeholder="prenume client"
                                    value={prenume} onChange={(e) => { setPrenume(e.target.value); setPrenumeError(null) }} />
                                {
                                    prenumeError && <div style={{ color: 'red', fontSize: '10pt' }}>{prenumeError}</div>
                                }
                            </div>
                        </div>

                        {/* Telefon */}
                        <div className="col-md-12"><label className="labels">Mobile Number</label>
                            <input type="text" className="form-control" id="tel" aria-describedby="tel" placeholder="phone number"
                                value={tel} onChange={(e) => { setTel(e.target.value); setTelError(null) }} />
                            {
                                telError && <div style={{ color: 'red', fontSize: '10pt' }}>{telError}</div>
                            } </div>

                        {/* Email */}
                        <div className="col-md-12"><label className="labels">Email ID</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="enter email"
                                value={email} onChange={(e) => { setEmail(e.target.value); setEmailError(null) }} />
                            {
                                emailError && <div style={{ color: 'red', fontSize: '10pt' }}>{emailError}</div>
                            }</div>


                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="success" onClick={Exec}>
                            Programeaza
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }




    function AlertDismissibleExample() {


        if (showRed) {
            return (
                <>


                    <Modal show={showRed}  >
                       

                        <div className="alert alert-danger" role="alert">
                        Eroare salvare data , va rog selectati o alta data!
                        </div>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleCloseWarning}>
                            X
                        </Button>
                       
                    </Modal.Footer>
                    </Modal>


                </>

            );
        }



    }


    useEffect(() => {
        fetch(`/api/serviciu?id_serviciu=${idServiciu}`)
            .then(response => response.json())
            .then(data => {
                setServiciu(data[0]);
                // console.dir(data);
                loadUser(data[0].id_users)
                loadSubcateg(data[0].id_subcategorie)
            });
    }, []);


    const loadUser = (id) => {

        fetch(`/api/getUser?id=${id}`)
            .then(response => response.json())
            .then(data => {
                // console.dir(data);
                setUser(data);
            });
    }

    const loadSubcateg = (id) => {

        fetch(`/api/subcategorieUser?id=${id}`)
            .then(response => response.json())
            .then(data => {
                // console.dir(data);
                setSubcateg(data[0]);
            });
    }

    // useEffect(() => {
    //     console.dir(Date.now < new Date(datetime) ? "err" : 'ok');
    // }, [datetime]);

    const rezervare = () => {

        setNume('');
        setPrenume('');
        setEmail('');
        setTel('');

        today = new Date();

        an = 0;
        for (var i = 0; i < 4; i++) {
            an = (an * 10) + parseInt(datetime[i]);

        }
        luna = 0;
        for (var i = 5; i < 7; i++) {
            luna = (luna * 10) + parseInt(datetime[i]);

        }
        ziua = 0;
        for (var i = 8; i < 10; i++) {
            ziua = (ziua * 10) + parseInt(datetime[i]);

        }
        ora = 0;
        for (var i = 11; i < 13; i++) {
            ora = (ora * 10) + parseInt(datetime[i]);

        }
        minutul = 0;
        for (var i = 14; i < 16; i++) {
            minutul = (minutul * 10) + parseInt(datetime[i]);
        }

        if (an < today.getFullYear() || luna < (today.getMonth() + 1) || ziua < today.getDate()) {
            // alert("Eroare salvare data , va rog selectati o alta data!");
            setShowRed(true);
            return;
        }
        else {
            if (an === today.getFullYear() && luna === (today.getMonth() + 1) && ziua === today.getDate()) {
                if (ora < today.getHours()) {
                    setShowRed(true);
                    return;
                }
                else if (ora === today.getHours()) {
                    setShowRed(true);
                    return;
                }
            }
        }


        
        console.log("handleShow()");
        handleShow();





        // console.log(`Ora selectat: ${ora}`);
        // console.log(`Minutul selectat: ${minutul}`);
        // console.log(`Anul selectat: ${ziua}`);
    }


    return (
        <>

            <div id="wrapper" className='w-75 mx-auto'>
                <h1>Alege Data si Ora</h1>
                <br></br>
                <div id="divNegru">
                    {/* <img width={100} alt={user?.email} src={'https://wwww.gravatar.com/avatar/' + md5(user?.email)} /> */}
                    {/* <br></br> */}
                    <h4>{user?.nume}
                        &nbsp;
                        {user?.prenume}
                        &nbsp;
                    </h4>
                    <h5>({subcateg?.nume})</h5>

                    <h6>
                        <br></br>
                        <br></br>
                        Denumire: {serviciu?.denumire}
                        <br></br>
                        <br></br>
                        Descriere: {serviciu?.descriere}
                        <br></br>
                        <br></br>
                        Durata: {serviciu?.durata} minute
                        <br></br>
                        <br></br>
                        Pret: {serviciu?.pret} lei</h6>
                </div>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div id="divNegru">

                    <h4>Data</h4>
                    <input type="datetime-local" value={datetime} onChange={(e) => { setDateTime(e.target.value) }} />

                </div>
                <br></br>
                <br></br>
                <button type="submit" className="btn btn-success mb-5" onClick={() =>  rezervare() }>Continua</button>
                &nbsp;
                <button type="cancel" className="btn btn-danger mb-5" onClick={() => navigate(`/`)}>Cancel</button>

            </div>

            <AlertDismissibleExample />
            <Example />


        </>

    )
}
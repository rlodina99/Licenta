import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import md5 from "js-md5";
import { useLayoutEffect } from 'react';
import { useFloating, shift } from '@floating-ui/react-dom';
import Modal from 'react-bootstrap/Modal';
import ModalDialog from 'react-bootstrap/ModalDialog';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import ModalBody from 'react-bootstrap/ModalBody';
import ModalFooter from 'react-bootstrap/ModalFooter';

export default function DetaliuServici() {

    // const {x, y, reference, floating, strategy} = useFloating();
    let navigate = useNavigate();
    const { idServiciu } = useParams();
    const [user, setUser] = useState();
    const [subcateg, setSubcateg] = useState();
    const [serviciu, setServiciu] = useState();
    const [datetime, setDateTime] = useState();


    useEffect(() => {
        fetch(`/api/serviciu?id_serviciu=${idServiciu}`)
            .then(response => response.json())
            .then(data => {
                setServiciu(data[0]);
                console.dir(data);
                loadUser(data[0].id_users)
                loadSubcateg(data[0].id_subcategorie)
            });
    }, []);


    const loadUser = (id) => {

        fetch(`/api/getUser?id=${id}`)
            .then(response => response.json())
            .then(data => {
                console.dir(data);
                setUser(data);
            });
    }

    const loadSubcateg = (id) => {

        fetch(`/api/subcategorieUser?id=${id}`)
            .then(response => response.json())
            .then(data => {
                console.dir(data);
                setSubcateg(data[0]);
            });
    }

    useEffect(() => {
        console.dir(typeof (datetime));
    }, [datetime]);


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
                <button type="cancel" class="btn btn-success mb-5" onClick={() => navigate(`/`)}>Continua</button>
                &nbsp;
                <button type="cancel" class="btn btn-danger mb-5" onClick={() => navigate(`/`)}>Cancel</button>

            </div>


            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                Launch demo modal
            </button>

            <Modal.Dialog>
  tetet
</Modal.Dialog>


        </>

    )
}
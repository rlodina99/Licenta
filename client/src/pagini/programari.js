import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../componente/dataTable";
import { useParams } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import {formatTimestamp} from '../Utils'

function Programari({ user }) {

  const [data, setData] = useState(null);
  const [show, setShow] = useState(false);
  const [idProgramare, setIdProgramare] = useState('');

  let navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = (idx) => {
    setIdProgramare(idx);
    setShow(true);
  }

  useEffect(() => {
    loadProgramari();
  }, [])

  const loadProgramari = () => {

    setData(null);
    fetch(`/api/programari?id_firma=${window.connectedUser.id}`)
      .then(response => response.json())
      .then(programare => {
        if (programare.error) {
          alert('Eroare la stergere: ' + data.error)
        }
        else {
          // console.log(`${programare.length} loaded`);
          console.dir(programare);
          setData(programare);

        }

      })
  }


  const deleteProgramare = () => {

    handleClose();

    fetch(`api/deleteProgramare?id=${idProgramare}`)
      .then(response => response.json())
      .then(data => {
        // console.dir(data);
        if (data.error)
          alert('Eroare la stergere: ' + data.error)
        else {
          loadProgramari();
        }
      });
  }



  const onKeyUp = (e) => {
    if (e.keyCode === 13) loadProgramari();
  }



  function Delete() {
    return (
      <>
        <Modal show={show} >
          <Modal.Header >
            <Modal.Title>Atentie </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Suntei sigur ca doriti sa stergeti programarea?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              Anulare
            </Button>
            <Button variant="danger" onClick={deleteProgramare}>
              Sterge
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    )
  }


  return (
    <>

      <form className='w-75 mx-auto'>

        <h1>
          Calendar
        </h1>

        {/* <button type="button" className="btn btn-success" onClick={() => navigate(`/users/${user.id}/addservicii`)}>
                    Adaugare servicii </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={() => navigate(`/users`)}>
                    Inapoi </button> */}
        <div style={{ float: 'right', marginRight: '2rem' }}>
          <input name='search' id='searchBox' onKeyUp={onKeyUp} placeholder="Introduceti denumire " />
          &nbsp;
          <button type="button" className="btn btn-primary" onClick={loadProgramari} disabled={Array.isArray(data) ? false : true}>
            {Array.isArray(data) ? 'Caută' : 'Caut ...'}
          </button>
        </div>
        <br />
        <br />
        {
          <DataTable
            message={{
              empty: "Nu exista nici o programare in orarul tau...",
              loading: 'Incarc programarile ....'
            }}
            pageSize={5}
            columns={[

              {
                label: "Nume Client",
                field: "numeclient",
                width: '10%',
              },
              {
                label: "Prenume Client",
                field: "prenumeclient",
                width: '10%',
              },
              {
                label: "Tel Client",
                field: "telclient",
                width: '20%',
              },
              {
                label: "Denumire Serviciui",
                field: `den_serviciu`,
                width: '5%',
              },
              {
                label: "Nume Personal",
                field: `user_name`,
                width: '5%',
              },
              {
                label: "Data Programare",
                field: "data_programare",
                width: '50%',
                render : item => <span>{formatTimestamp(item.data_programare)}</span>
              },
              // {
              //   width: '100px',
              //   render: item => <button type="button" className="btn btn-primary" onClick={() => navigate(`/programari`)}> edit </button>
              // },
              {

                width: '100px',
                render: item => <button type="button" className="btn btn-danger" onClick={() => handleShow(item.id)}> delete </button>
              },

            ]}
            items={data}
            orderBy={{
              field: 'nume',
              asc: true
            }}
          />

        }
      </form>

      <Delete />

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
      ? <Programari user={user} />
      : <h1>incarc datele ....</h1>

  )
}
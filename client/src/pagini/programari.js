import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../componente/dataTable";
import { useParams } from 'react-router-dom';

function Programari({ user }) {

  const [data, setData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    loadProgramari();
  }, [])

  const loadProgramari = () => {

    setData(null);
    fetch(`/api/programari`)
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
        // setDataKey(dataKey + 1);
      })
  }


  const deleteProgramare = (id) => {
    fetch(`api/deleteProgramare?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.dir(data);
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


  return (
    <>

      <form className='w-75 mx-auto'>
        <h1>
          {/* {user.id} */}
          Test

        </h1>

        <br></br>
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
                label: "id_serviciu",
                field: "id_serviciu",
                width: '5%',
              },
              {
                label: "id Personal",
                field: "id_users",
                width: '5%',
              },
              {
                label: "Data Programare",
                field: "data_programare",
                width: '50%',
              },
              {
                width: '100px',
                render: item => <button type="button" className="btn btn-primary" onClick={() => navigate(`/programari`)}> edit </button>
              },
              {

                width: '100px',
                render: item => <button type="button" className="btn btn-danger" onClick={() => deleteProgramare(item.id)}> delete </button>
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
import { useEffect, useState } from "react";
import md5 from "js-md5";
import { useNavigate } from "react-router-dom";
import DataTable from "../componente/dataTable";

export default function Produse() {

  const [data, setData] = useState(null);
  let navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = () => {
    const searchText = document.getElementById('searchBox').value;
    setData(null);
    fetch(`api/users?id_firma=${window.connectedUser.id}&searchText=${searchText}`)
      .then(response => response.json())
      .then(users => {
        if (users.error) {
          alert('Eroare la stergere: ' + data.error)
        }
        else {
          console.log(`${users.length} loaded`);
          setData(users);
        }
        // setDataKey(dataKey + 1);
      })
  }


  const deleteUser = (id) => {
    fetch(`api/deleteUser?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.dir(data);
        if (data.error)
          alert('Eroare la stergere: ' + data.error)
        else {
          loadUsers();

        }
      });
  }



  const onKeyUp = (e) => {
    if (e.keyCode == 13) loadUsers();
  }


  return (
    <>

<form className='w-75 mx-auto'>



        <button type="button" className="btn btn-success" onClick={() => navigate(`/users/adduser`)}>
          Adaugare personal </button>
        <div style={{ float: 'right', marginRight: '2rem' }}>
          <input name='search' id='searchBox' onKeyUp={onKeyUp} placeholder="Introduceti numele " />
          &nbsp;
          <button type="button" className="btn btn-primary" onClick={loadUsers} disabled={Array.isArray(data) ? false : true}>
            {Array.isArray(data) ? 'Caută' : 'Caut ...'}
          </button>
        </div>
        <br />
        <br />
        {
          <DataTable
            message={{
              empty: "Nu exista nici un angajat in lista ta...",
              loading: 'Incarc datele ....'
            }}
            pageSize={5}
            columns={[
              {

                label: "Avatar",
                field: "id",
                width: '10%',
                render: item => <img width={50} alt={item.email} src={'https://secure.gravatar.com/avatar/' + md5(item.email)} />,

              },
              {
                label: "Nume",
                field: "nume",
                width: '10%',
              },
              {
                label: "Prenume",
                field: "prenume",
                width: '10%',
              },
              {
                label: "Telefon",
                field: "tel",
                width: '30%',
              },
              {
                label: "Email",
                field: "email",
                width: '30%',
              },
              {
                label: "Specializare",
                field: "specializare",
                width: '30%',
              },
              {
                width: '100px',
                render: item => <button type="button" className="btn btn-primary" onClick={() => navigate(`/users/${item.id}/servicii`)}> servicii </button>
              },
              {
                width: '100px',
                render: item => <button type="button" className="btn btn-primary" onClick={() => navigate(`/users/${item.id}/edit`)}> edit </button>
              },
              {

                width: '100px',
                render: item => <button type="button" className="btn btn-danger" onClick={() => deleteUser(item.id)}> delete </button>
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
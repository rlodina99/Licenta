import { useEffect, useState } from "react";
import md5 from "js-md5";
import { useNavigate } from "react-router-dom";


export default function Produse() {
  /// data = null - inca nu s-a incarcat mnimic
  // data = [] - nu exista nici un user
  const [data, setData] = useState(null);
  /*
  orderBy =  {
    field: nume | email,
    asc: True | false
  }
  */
  const [orderBy, setOrderBy] = useState(null);

  let navigate = useNavigate();

  useEffect(() => {
    loadUsers();
  }, [])

  const loadUsers = () => {
    const searchText = document.getElementById('searchBox').value;
    setData(null);
    fetch(`api/users?searchText=${searchText}&email=yahoo`)
      .then(response => response.json())
      .then(users => {
        console.log(users);
        setData(users);

      })

  }

  const showLoading = () => <div>Incarc datele ....</div>;

  const deleteUser = (id) => {
    fetch(`api/deleteUser?id=${id}`)
      .then(response => response.json())
      .then(data => {
        console.dir(data);
        data.error ? alert('Eroare la stergere: ' + data.error) : loadUsers();
      });
  }


  const showUsers = () => {
    return data.length === 0
      ? <div>Nu exista nici un utilizator ...</div>
      : data.map(item => {
        return (
          <tr key={item.id}>
            <td>
              <img src={'https://secure.gravatar.com/avatar/' + md5(item.email)} /></td>
            <td>{item.nume}</td>
            <td>{item.email}</td>
            <td>
              <button type="button" className="btn btn-danger" onClick={() => deleteUser(item.id)}> delete </button>&nbsp;
              {/* <Link to={`/users/${item.id}/edit`}>  edit </Link> */}
              <button type="button" className="btn btn-primary" onClick={() => navigate(`/users/${item.id}/edit`)}> edit </button>
            </td>
          </tr>
        )
      })

  }

  const onKeyUp = (e) => {
    if (e.keyCode == 13) loadUsers();
  }

  const setOrder = (field) => {

    let newOrder = null;
    if (orderBy?.field === field) {
      newOrder = {
        field,
        asc: !orderBy.asc
      };
    }
    else {
      newOrder = {
        field,
        asc: true
      };
    }

    setOrderBy(newOrder);

    const users = data.slice(0);

    users.sort((a, b) => {
      if (a[field] === b[field]) return 0;
      return ((a[field] < b[field]) ? 1 : -1) * (newOrder.asc ? 1 : -1)
    })


    setData(users);
    // alert(`order by : ${orderBy.field} ${orderBy.asc ? ' ASC' : 'DESC'}`)
  }

  return (
    <>
      <button type="button" className="btn btn-primary" onClick={() => navigate(`/users/adduser`)}>
        Adaugare user </button>
      <div style={{ float: 'right', marginRight: '2rem' }}>
        <input name='search' id='searchBox' onKeyUp={onKeyUp} placeholder="Introduceti numele " />
        &nbsp;
        <button type="button" className="btn btn-primary" onClick={loadUsers} disabled={Array.isArray(data) ? false : true}>
          {Array.isArray(data) ? 'Caută' : 'Caut ...'}
        </button>
      </div>
      <br />
      <br />
      <table className="table table-striped table-hover" >
        <thead>
          <tr>
            <td>#</td>
            <td onClick={() => setOrder('nume')} style={{ cursor: 'pointer' }}>
              Nume
              {
                orderBy?.field === 'nume' && (orderBy.asc ? <span>&#8593;</span> : <span>&#8595;</span>)
              }
            </td>
            <td onClick={() => setOrder('email')} style={{ cursor: 'pointer' }}>
              Email
              {
                orderBy?.field === 'email' && (orderBy.asc ? <span>&#8593;</span> : <span>&#8595;</span>)
              }
            </td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) ? showUsers() : showLoading()}
        </tbody>
      </table>
    </>
  )
}
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../componente/dataTable";
import { useParams } from 'react-router-dom';

function Servicii({ user }) {

    const [data, setData] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        loadServicii();
    }, [])

    const loadServicii = () => {
        const searchText = document.getElementById('searchBox').value;
        setData(null);
        fetch(`/api/servicii?id_users=${user.id}&searchText=${searchText}`)
            .then(response => response.json())
            .then(serviciu => {
                if (serviciu.error) {
                    alert('Eroare la stergere: ' + data.error)
                }
                else {
                    // console.log(`${serviciu.length} loaded`);
                    // console.dir(serviciu);
                    setData(serviciu);
                }
                // setDataKey(dataKey + 1);
            })
    }


    const deleteServicii = (id) => {
        fetch(`api/deleteServicii?id=${id}`)
            .then(response => response.json())
            .then(data => {
                console.dir(data);
                if (data.error)
                    alert('Eroare la stergere: ' + data.error)
                else {
                    loadServicii();
                }
            });
    }



    const onKeyUp = (e) => {
        if (e.keyCode === 13) loadServicii();
    }


    return (
        <>

            <form className='w-75 mx-auto'>
                <h1>
                    {/* {user.id} */}
                    {user.nume}
                    &nbsp;
                    {user.prenume}

                </h1>

                <br></br>
                <button type="button" className="btn btn-success" onClick={() => navigate(`/users/${user.id}/addservicii`)}>
                    Adaugare servicii </button>
                &nbsp;
                <button type="button" className="btn btn-danger" onClick={() => navigate(`/users`)}>
                    Inapoi </button>
                <div style={{ float: 'right', marginRight: '2rem' }}>
                    <input name='search' id='searchBox' onKeyUp={onKeyUp} placeholder="Introduceti denumire " />
                    &nbsp;
                    <button type="button" className="btn btn-primary" onClick={loadServicii} disabled={Array.isArray(data) ? false : true}>
                        {Array.isArray(data) ? 'Caută' : 'Caut ...'}
                    </button>
                </div>
                <br />
                <br />
                {
                    <DataTable
                        message={{
                            empty: "Nu exista nici un serviciu in lista ta...",
                            loading: 'Incarc datele ....'
                        }}
                        pageSize={5}
                        columns={[

                            {
                                label: "Denumire",
                                field: "denumire",
                                width: '30%',
                            },
                            {
                                label: "Durata ( min )",
                                field: "durata",
                                width: '20%',
                            },
                            {
                                label: "Pret ( lei )",
                                field: "pret",
                                width: '10%',
                            },
                            {
                                label: "Descriere",
                                field: "descriere",
                                width: '30%',
                            },
                            {
                                width: '100px',
                                render: item => <button type="button" className="btn btn-primary" onClick={() => navigate(`/users/${user.id}/editservicii/${item.id}`)}> edit </button>
                            },
                            {

                                width: '100px',
                                render: item => <button type="button" className="btn btn-danger" onClick={() => deleteServicii(user.id)}> delete </button>
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
            ? <Servicii user={user} />
            : <h1>incarc datele ....</h1>

    )
}
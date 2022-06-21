import { Link, useNavigate } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import DataTable from "../componente/dataTable";


export default function Home() {

  const [data, setData] = useState(null);
  const [data1, setData1] = useState(null);

  let navigate = useNavigate();

  const [categorii, setCategorii] = useState([]);
  const [id_cat, setId_cat] = useState(0);


  const [id_subCat, setId_subCat] = useState(0);
  const [subcategorii, setSubCategorii] = useState([]);


  useEffect(() => {
    fetch('/api/categorii')
      .then(response => response.json())
      .then(data => {
        setCategorii(data);
      });
  }, []);



  const onCategorieChanged = (e) => {
    const idCat = e.target.value;
    fetch(`/api/subcategorie?id_cat=${idCat}`)
      .then(response => response.json())
      .then(data => {
        setSubCategorii(data);
      });
    setId_cat(idCat);
    console.dir(idCat);
  }


  useEffect(() => {
    loadServicii(id_subCat);
  }, [id_subCat])

  const loadServicii = (id_subCat) => {

    setData(null);

    fetch(`/api/serviciiProg?id_subcategorie=${id_subCat}`)
      .then(response => response.json())
      .then(serviciu => {
        if (serviciu.error) {
          alert('Eroare la stergere: ' + data.error)
        }
        else {
          // console.log(`${serviciu.length} loaded`);
          console.dir(serviciu);
          setData1(serviciu);
        }
        // setDataKey(dataKey + 1);
      })
  }

  return (
    <>

      <form className='w-75 mx-auto'>

        <h2>
          Cauti un salon de Beauty, un Hairstyle sau un Medic?
        </h2>


        <div class="form-outline mb-4 ">

          <select class="form-select w-100 " id="categ" value={id_cat} onChange={onCategorieChanged} >
            <option selected value={0}>Alege o categorie...</option>
            {
              categorii.map(c => {
                return <option key={c.id} value={c.id}> {c.nume} </option>;
              })
            }
          </select>



          <br></br>

          <select class="form-select w-100 " id="subcateg"
            value={id_subCat}
            disabled={id_cat == 0}
            onChange={(e) => { setId_subCat(e.target.value); }}   >

            <option selected value={0}>alege o specializare...</option>
            {
              subcategorii.map(c => {
                return <option key={c.id} value={c.id}>{c.nume}</option>;
              })
            }
          </select>
          <br></br>
          {/* <button type="button" onClick={() => { }} class="btn btn-success">Cauta</button> */}
        </div>




        {console.log(`Categoria:  ${id_cat}  si subcategoria ${id_subCat}`)}

        {
          <DataTable
            message={{
              empty: "Nu am gasit nimic sa se potriveasca pentru tine...",
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
                render: item => <button type="button" className="btn btn-primary" onClick={() => navigate(`/programeaza`)}> Programeaza </button>
              },


            ]}
            items={data1}
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
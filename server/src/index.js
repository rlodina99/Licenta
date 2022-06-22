const express = require('express');
// const cookieParser = require('cookie-parser');
const path = require('path');
const { execSQL } = require('./db')

const app = express()
const port = 5000

// app.use(cookieParser('MY STROMG KEY'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', async (req, res) => {
  let { email, password } = req.body;
  if (!email) return res.json({ error: 'Email invalid' });
  if (!password) return res.json({ error: 'Parola invalida invalida' });

  try {
    const data = await execSQL(`SELECT *  FROM firme where email ='${email}' and password = '${password}'`);
    if (data.rowCount === 1)
      res.json(data.rows[0])
    else {
      res.json({ error: `Parola sau email inexistent` });
    }
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.post('/api/register', async (req, res) => {

  let { nume, cf, id_cat, email, password } = req.body;

  if (!email) return res.json({ error: 'Email invalid' });

  try {
    await execSQL(`insert into firme (email, cf, id_cat, nume, password) values ('${email}', '${cf}', '${id_cat}', '${nume}', '${password}')`);
    res.json({ ok: 1 });
  }
  catch (error) {
    res.json({ error: error.message })
  }

});


// de aici in jos trebuie sa fii conectat

app.get('/api/users', async (req, res) => {

  console.log('GET /api/users');
  let sqlStmt = `SELECT u.id, u.nume, u.prenume, u.tel, email, avatar, c.nume specializare 
  from users u
  JOIN subcategorie c ON c.id = u.id_subcat WHERE id_firma=${req.query.id_firma}`;
  if (req.query.searchText)
    sqlStmt += ` AND u.nume ilike '%${req.query.searchText}%'`

  sqlStmt += " ORDER BY lower(u.nume)";
  try {
    const data = await execSQL(sqlStmt);
    res.json(data.rows)
  }
  catch (error) {
    console.log('Eror on get users' + error)
    res.json({ error })
  }
});

app.get('/api/deleteUser', async (req, res) => {
  // const id = req.query.id;
  const { id } = req.query;
  try {
    await execSQL(`DELETE FROM users where id =${id}`);
    res.json({ ok: 1 })
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/deleteServicii', async (req, res) => {
  // const id = req.query.id;
  const { id } = req.query;
  try {
    await execSQL(`DELETE FROM servicii where id =${id}`);
    res.json({ ok: 1 })
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/deleteProgramare', async (req, res) => {
  // const id = req.query.id;
  const { id } = req.query;
  try {
    await execSQL(`DELETE FROM programari where id =${id}`);
    res.json({ ok: 1 })
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/deleteProgr', async (req, res) => {
  // const id = req.query.id;
  const { id } = req.query;
  try {
    await execSQL(`DELETE FROM servicii where id =${id}`);
    res.json({ ok: 1 })
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/getUser', async (req, res) => {
  // const id = req.query.id;
  const { id } = req.query;
  try {
    const data = await execSQL(`SELECT *  FROM users where id =${id}`);
    if (data.rowCount === 1)
      res.json(data.rows[0])
    else {
      res.json({ error: `Nu exista user-ul ${id}` });
    }
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/getFirma', async (req, res) => {
  // const id = req.query.id;
  const { id } = req.query;
  try {
    const data = await execSQL(`SELECT * FROM firme where id =${id}`);
    if (data.rowCount === 1)
      res.json(data.rows[0])
    else {
      res.json({ error: `Nu exista firma cu id: ${id}` });
    }
  }
  catch (error) {
    res.json({ error: error.message })
  }

});


app.get('/api/categorii', async (req, res) => {
  // const id = req.query.id;
  const { id } = req.query;
  try {
    const data = await execSQL(`SELECT *  FROM categorie order by nume`);
    res.json(data.rows);
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/subcategorieUser', async (req, res) => {

  const { id } = req.query;
  try {
    const data = await execSQL(`SELECT *  FROM subcategorie where id =${id}`);
    res.json(data.rows);
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/subcategorie', async (req, res) => {

  const { id_cat } = req.query;
  try {
    const data = await execSQL(`SELECT *  FROM subcategorie where id_cat = ${id_cat} order by nume`);
    res.json(data.rows);
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/subcategorii', async (req, res) => {
  // const id = req.query.id;
  const { id } = req.query;
  try {
    const data = await execSQL(`SELECT * FROM subcategorie  WHERE id_cat=${req.query.id_cat} order by nume`);
    res.json(data.rows);
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.post('/api/editUser', async (req, res) => {
  let { id, nume, prenume, email, tel, adresa, oras, id_subCat } = req.body;
  if (!email) return res.json({ error: 'Email invaluid' });

  email = email.replaceAll("'", "''");
  try {
    const data = await execSQL(`SELECT *  FROM users where id =${id}`);
    if (data.rowCount === 1) {
      await execSQL(`update users set nume= '${nume}', prenume= '${prenume}', email= '${email}', tel= '${tel}', adresa= '${adresa}', oras= '${oras}', id_subcat= '${id_subCat}' where id = ${id}`);
      res.json({ ok: 1 });
    }
    else {
      res.json({ error: `Nu exista user-ul ${id}` });
    }
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.post('/api/editServ', async (req, res) => {

  let { id, denumire, descriere, pret, durata } = req.body;

  try {
    const data = await execSQL(`SELECT *  FROM servicii WHERE id =${id}`);
    if (data.rowCount === 1) {
      await execSQL(`update servicii set denumire= '${denumire}', descriere= '${descriere}', pret= '${pret}', durata= '${durata}' where id = ${id}`);
      res.json({ ok: 1 });
    }
    else {
      res.json({ error: `Nu exista user-ul ${id}` });
    }
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/serviciu', async (req, res) => {

  const { id_serviciu } = req.query;

  try {
    const data = await execSQL(`SELECT *  FROM servicii where id = ${id_serviciu}`);
    res.json(data.rows);
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.get('/api/programari', async (req, res) => {


  let sqlStmt = `SELECT id, numeclient, prenumeclient, telclient, id_serviciu, id_users, data_programare FROM programari`;

  try {
    const data = await execSQL(sqlStmt);
    res.json(data.rows)
  }
  catch (error) {
    console.log('Eror on get users' + error)
    res.json({ error })
  }
});


app.get('/api/servicii', async (req, res) => {


  let sqlStmt = `SELECT id, denumire, descriere, pret, durata FROM servicii WHERE id_users=${req.query.id_users}`;
  if (req.query.searchText)
    sqlStmt += ` AND denumire ilike '%${req.query.searchText}%'`

  sqlStmt += " ORDER BY lower(denumire)";
  try {
    const data = await execSQL(sqlStmt);
    res.json(data.rows)
  }
  catch (error) {
    console.log('Eror on get users' + error)
    res.json({ error })
  }
});

app.get('/api/serviciiProg', async (req, res) => {
  // const id = req.query.id;
  const { id_subcategorie } = req.query;
  try {
    const data = await execSQL(`SELECT *  FROM servicii where id_subcategorie =${id_subcategorie}`);
    res.json(data.rows)
  }
  catch (error) {
    res.json({ error: error.message })
  }

});



app.post('/api/addServ', async (req, res) => {

  let { id_users, id_subcategorie, denumire, descriere, pret, durata } = req.body;

  try {
    await execSQL(`insert into servicii (id_users, id_subcategorie, denumire, descriere, pret, durata) values ('${id_users}', '${id_subcategorie}', '${denumire}', '${descriere}', ${pret}, ${durata})`);
    res.json({ ok: 1 });
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.post('/api/addProgramare', async (req, res) => {

  let { nume, prenume, email, tel, id_serviciu, id_users, data_programare } = req.body;

  if (!email) return res.json({ error: 'Email invalid' });


  try {
    await execSQL(`insert into programari (numeclient, prenumeclient, emailclient, telclient, id_serviciu, id_users, data_programare) values ('${nume}', '${prenume}', '${email}', '${tel}', ${id_serviciu}, ${id_users}, '${data_programare}')`);
    res.json({ ok: 1 });
  }
  catch (error) {
    res.json({ error: error.message })
  }

});



app.post('/api/addUser', async (req, res) => {

  let { nume, prenume, email, tel, id_firma, id_subCat, adresa, oras } = req.body;

  if (!email) return res.json({ error: 'Email invalid' });


  try {
    await execSQL(`insert into users (email, nume, prenume, tel, id_firma, id_subcat, adresa, oras) values ('${email}', '${nume}', '${prenume}', '${tel}', ${id_firma}, ${id_subCat}, '${adresa}', '${oras}')`);
    res.json({ ok: 1 });
  }
  catch (error) {
    res.json({ error: error.message })
  }

});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
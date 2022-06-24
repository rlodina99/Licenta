const { Pool, Client } = require('pg')
// const connectionString = 'postgresql://rlodina@localhost:5432/razvan'

const connectionString = 'postgresql://razvan@dev.local/razvan'
const pool = new Pool({
  connectionString,
})
const client = new Client({
  connectionString,
})


client.connect()

/// executa si intoarce datee in format JSON
const execSQL = async (sqlStmt) => {
  console.log(sqlStmt);
  return  client.query(sqlStmt);
}

const execSQLScalar = async (sqlStmt) => {
  console.log(sqlStmt);
  const data = await  client.query(sqlStmt);

  return data.rows[0][data.fields[0].name]
}

module.exports = {
  execSQL,
  execSQLScalar
}
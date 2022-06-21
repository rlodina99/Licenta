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

module.exports = {
  execSQL
}
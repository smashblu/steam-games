dotenv = require('dotenv').config()
const mysql = require('mysql2/promise')
let connection
const initDB = async () => {
  connection = await mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
}
initDB()

const formattedQuery = 'games.id AS gameId, games.title, games.releaseDate, games.rating, games.currentPrice, games.publisherId, publisher.name FROM games LEFT JOIN publisher ON games.publisherId=publisher.id'

const findGames = async (term, val) => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT ${formattedQuery} WHERE ${term} = ${val}`
    )
    const results = SQLtoJSON(rows)
    return results
  } catch (err) {
    console.log(err)
  }
  return
}

const existsHelper = async (key, target) => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT ${key} FROM games WHERE ${key} = ?`, 
      [target]
    )
    if (rows.length === 0) {
      return false
    }
    return true
  } catch (err) {
    console.log(err)
  }
return
}

const listGames = async (limit) => {
  try {
    const [rows, fields] = await connection.execute(
      `SELECT ${formattedQuery} LIMIT ${limit}`
    )
    const results = SQLtoJSON(rows)
    return results
  } catch (err) {
    console.log(err)
  }
  return []
}

const addGame = async (obj) => {
  try {
    const queryVals = []
    for (const [key, val] of Object.entries(obj).sort()) {
      if (key === 'publisher') {
        queryVals.push(val['publisherId'])
      } else if (key === 'gameId') {
        console.debug('Skip adding id (MySQL auto-increment)')
      } else {
        queryVals.push(val)
      }
    }
    
    const [rows, fields] = await connection.execute(
      'INSERT INTO games (currentPrice, publisherId, rating, releaseDate, title) VALUES (?, ?, ?, ?, ?)', queryVals
    )

    return
  } catch (err) {
    console.log(err)
  }
  return
}

const delGame = async (id) => {
  try {
    await connection.execute(
      `DELETE FROM games WHERE id = ?`, 
      [id]
    )
    return
  } catch (err) {
    console.log(err)
  }
return
}

const SQLtoJSON = (data) => {
  return data.map(r => ({
    gameId: r.gameId,
    title: r.title,
    releaseDate: r.releaseDate,
    rating: r.rating,
    currentPrice: parseFloat(r.currentPrice),
    publisher: {
      publisherId: r.publisherId,
      name: r.name
    }
  }))
}

module.exports = { findGames, existsHelper, listGames, addGame, delGame }

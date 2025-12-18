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
      switch (key) {      
        case 'currentPrice':
        case 'rating':
        case 'releaseDate':
        case 'title':
          queryVals.push(val)
          break
        case 'publisher':
          queryVals.push(val['publisherId'])
          break
        case 'gameId':
        default:
          break
      }
    }
    
    await connection.execute(
      'INSERT INTO games (currentPrice, publisherId, rating, releaseDate, title) VALUES (?, ?, ?, ?, ?)', queryVals
    )

    return
  } catch (err) {
    console.log(err)
  }
  return
}

const updateGame = async (obj, id) => {
  try {
    const queryKeys = []
    let changePub = ''
    for (const [key, val] of Object.entries(obj).sort()) {
      switch (key) {      
        case 'currentPrice':
        case 'rating':
        case 'releaseDate':
        case 'title':
          queryKeys.push(key)
          break
        case 'publisher':
          changePub = ` publisherId = ${val['id']},`
          break
        case 'gameId':
        default:
          break
      }
    }

    const statements = queryKeys.map(e => ` ${e} = '${obj[e]}'`)
    const fullQuery = `UPDATE games SET${changePub}${statements} WHERE id = ${id}`

    await connection.execute(
      fullQuery
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

module.exports = { findGames, existsHelper, listGames, addGame, updateGame, delGame }

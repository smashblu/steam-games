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

/* const gameRatings = [
  'Rating Pending',
  'Rating Pending - Likely Mature 17+',
  'Everyone',
  'Everyone 10+',
  'Teen',
  'Mature 17+',
  'Adults Only 18+',
]
const dummyPublishers = [
  {
    publisherId: 1,
    name: 'Nintendo'
  },
  {
    publisherId: 2,
    name: 'Sega'
  },
  {
    publisherId: 3,
    name: 'Midway'
  },
  {
    publisherId: 4,
    name: 'Konami'
  },
]

const dummyGames = [
  {
    gameId: 1,
    title: 'Super Mario Bros. 3',
    rating: gameRatings[2],
    releaseDate: '1990-02-12',
    currentPrice: 19.99,
    publisher: dummyPublishers[0]
  },
  {
    gameId: 2,
    title: 'Sonic the Hedgehog 2',
    rating: gameRatings[2],
    releaseDate: '1992-11-24',
    currentPrice: 9.99,
    publisher: dummyPublishers[1]
  },
  {
    gameId: 3,
    title: 'Mortal Kombat 4',
    rating: gameRatings[5],
    releaseDate: '1997-09-11',
    currentPrice: 19.99,
    publisher: dummyPublishers[2]
  },
  {
    gameId: 4,
    title: 'The Legend of Zelda: Ocarina of Time',
    rating: gameRatings[2],
    releaseDate: '1998-11-23',
    currentPrice: 59.99,
    publisher: dummyPublishers[0]
  },
  {
    gameId: 5,
    title: 'Metal Gear Solid 3: Snake Eater',
    rating: gameRatings[5],
    releaseDate: '2004-11-17',
    currentPrice: 69.99,
    publisher: dummyPublishers[3]
  },
] */

const listGames = async () => {
  try {
    const [rows, fields] = await connection.execute(
      'SELECT games.id AS gameId, games.title, games.releaseDate, games.rating, games.currentPrice, games.publisherId, publisher.name FROM games LEFT JOIN publisher ON games.publisherId=publisher.id LIMIT 25',
    )

    const results = rows.map(r => ({
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

    return results
  } catch (err) {
    console.log(err)
  }
  return []
}

const addGame = async (obj) => {
  try {

    const [result, fields] = await connection.execute(
      'INSERT INTO games (title, releaseDate, rating, publisherId, currentPrice) VALUES (?, ?, ?, ?, ?)', [obj['title'], obj['releaseDate'], obj['rating'], obj['publisher']['publisherId'], obj['currentPrice']]
    )

    return
  } catch (err) {
    console.log(err)
  }
  return
}

const delGame = async (index) => {
  dummyGames.splice(index, 1)
  return
}

module.exports = { listGames, addGame, delGame }

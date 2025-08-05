const express = require('express')
const app = express()
const port = 3000

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
  }
]

const dummyGames = [
  {
    gameId: 1,
    title: 'Super Mario Bros. 3',
    rating: 'E',
    releaseDate: '1990-02-12',
    currentPrice: 59.99,
    publisher: dummyPublishers[0]
  },
  {
    gameId: 2,
    title: 'Sonic the Hedgehog 2',
    rating: 'E',
    releaseDate: '1992-11-24',
    currentPrice: 59.99,
    publisher: dummyPublishers[1]
  },
  {
    gameId: 3,
    title: 'Mortal Kombat 4',
    rating: 'M',
    releaseDate: '1997-09-11',
    currentPrice: 59.99,
    publisher: dummyPublishers[2]
  },
  {
    gameId: 4,
    title: 'The Legend of Zelda: Ocarina of Time',
    rating: 'E',
    releaseDate: '1998-11-23',
    currentPrice: 59.99,
    publisher: dummyPublishers[0]
  }
]

app.get('/games', (req, res) => {
  res.send(dummyGames)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
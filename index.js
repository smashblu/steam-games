const express = require('express')
const app = express()
const port = 3000

const gameRatings = ['Rating Pending', 'Rating Pending - Likely Mature 17+', 'Everyone', 'Everyone 10+', 'Teen', 'Mature 17+', 'Adults Only 18+']
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
  }
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
  }
]

function validateNum(num) {
  if (isNaN(num)) {
    return false
  }
  return true
}

function existsHelper(objArr, testObj, val) {
  for (item of objArr) {
    if (item[val] === testObj[val]) {
      return true
    }
  }
  return false
}

app.use(express.json())

app.get('/games', (req, res) => {
  res.send(dummyGames)
})

app.get('/games/gameId=:gameId', (req, res) => {
  if (validateNum(req.params['gameId'])) {
    const gameNum = req.params['gameId']
    res.send(dummyGames[gameNum - 1])
  }
})

app.get('/games/publisherId=:publisherId', (req, res) => {
  if (validateNum(req.params['publisherId'])) {
    const pubNum = req.params['publisherId']
    const pubList = []
    for (game of dummyGames) {
      if (game['publisher']['publisherId'] === parseInt(pubNum)) {
        pubList.push(game)
      }
    }
    res.send(pubList)
  }
})

app.patch('/games/gameId=:gameId', (req, res) => {
  const gameObj = dummyGames[req.params['gameId'] - 1]
  for (const [key, value] of Object.entries(gameObj)) {
    if (req.body.hasOwnProperty(key)) {
      gameObj[key] = `${req.body[key]}`
    }
  }
  res.end('Update successful')
})

app.post('/games/gameId=:gameId', (req, res) => {
  req.body['gameId'] = parseInt(req.params['gameId'])
  if (existsHelper(dummyGames, req.body, 'gameId')) {
      res.end('Game already exists, no action taken')
  } else {
    dummyGames.push(req.body)
    res.end('Creation successful')
  }
})

app.delete('/games/gameId=:gameId', (req, res) => {
  res.end('Deletion successful')
})

app.listen(port, () => {
  console.log(`Steam Games listening on port ${port}`)
})
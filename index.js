const express = require('express')
const app = express()
const port = 3000

const gameRatings = [
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
]

const validateNum = num => {
  if (isNaN(num)) {
    return false
  }
  return true
}

const existsHelper = (objArr, target, val) => {
  for (item of objArr) {
    if (item[val] === target) {
      return true
    }
  }
  return false
}

const findProperty = (el, target) => {
  return dummyGames.find((element) => 
  element[el] === target
)}

const updateProps = (target, changes) => {
  for (const key of Object.keys(changes)) {
    if (target.hasOwnProperty(key)) {
    changes[key] = target[key]
    }
  }
}

const matchProp = (obj, prop, curr) => {
  if (obj.hasOwnProperty(prop)) {
    if (obj[prop] !== curr) {
      return true
    }
  }
  return false
}

const makeList = (target, prop, val) => {
  const list = []
  for (game of dummyGames) {
    if (game[prop][val] === target) {
      list.push(game)
    }
  }
  return list
}

app.use(express.json())

app.get('/games', (req, res) => {
  res.send(dummyGames)
})

app.post('/games', (req, res) => {
  const gameNum = req.body['gameId']
  if (existsHelper(dummyGames, gameNum, 'gameId')) {
      res.status(409).end('Game ID already exists, no action taken')
  } else {
    dummyGames.push(req.body)
    res.end('Creation successful')
  }
})

app.get('/games/gameId=:gameId', (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  if (validateNum(gameNum)) {
    const foundGame = findProperty('gameId', gameNum)
    res.send(foundGame)
  } else {
    res.status(400).end('Game ID is not a number')
  }
})

app.get('/games/publisherId=:publisherId', (req, res) => {
  const pubNum = parseInt(req.params['publisherId'])
  if (validateNum(pubNum)) {
    const pubList = makeList(pubNum, 'publisher', 'publisherId')
    res.send(pubList)
  } else {
    res.status(404).end('Not found')
  }
})

app.patch('/games/gameId=:gameId', (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  const newGameData = req.body
  if (matchProp(newGameData, 'gameId', gameNum)) {
    res.status(400).end('Game ID cannot be changed')
  } else {
    const foundGame = findProperty('gameId', gameNum)
    updateProps(newGameData, foundGame)
    res.status(201).end('Update successful')
  }
})

app.post('/games/gameId=:gameId', (req, res) => {
  req.body['gameId'] = parseInt(req.params['gameId'])
  if (existsHelper(dummyGames, req.body, 'gameId')) {
      res.end('Game ID already exists, no action taken')
  } else {
    dummyGames.push(req.body)
    res.end('Creation successful')
  }
})

app.delete('/games/gameId=:gameId', (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  const targetGame = dummyGames.findIndex((element) =>
      element['gameId'] === gameNum
    )
  dummyGames.splice(targetGame, 1)
  res.end('Deletion successful')
})

app.listen(port, () => {
  console.log(`Steam Games listening on port ${port}`)
})

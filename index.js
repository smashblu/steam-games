const express = require('express')
const app = express()
const port = 3000
const { validateNum, existsHelper, findProperty, findPropertyIndex, updateProps, matchProp, makeList } = require('./service.js')
const { listGames, addGame, delGame } = require('./database.js')

app.use(express.json())

app.get('/games', (req, res) => {
  res.send(listGames())
  return
})

app.post('/games', (req, res) => {
  const game = req.body
  const gameNum = req.body['gameId']
  if (existsHelper(gameNum, 'gameId')) {
    res.status(409).end('Game ID already exists, no action taken')
    return
  }
  addGame(game)
  res.status(201).end('Creation successful')
  return
})

app.get('/games/gameId=:gameId', (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  if (validateNum(gameNum)) {
    if (existsHelper(gameNum, 'gameId')) {
      const foundGame = findProperty('gameId', gameNum)
      res.send(foundGame)
      return
    }
    res.status(404).end('Game ID does not exist')
    return
  }
  res.status(400).end('Game ID is not a number')
  return
})

app.get('/games/publisherId=:publisherId', (req, res) => {
  const pubNum = parseInt(req.params['publisherId'])
  if (validateNum(pubNum)) {
    if (existsHelper(pubNum, 'publisher', 'publisherId')) {
      const pubList = makeList(pubNum, 'publisher', 'publisherId')
      res.send(pubList)
      return
    }
    res.status(404).end('Publisher ID does not exist')
    return
  }
  res.status(400).end('Publisher ID is not a number')
  return
})

app.patch('/games/gameId=:gameId', (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  const newGameData = req.body
  if (existsHelper(gameNum, 'gameId')) {
    if (matchProp(newGameData, 'gameId', gameNum)) {
      res.status(400).end('Game ID cannot be changed')
      return
    }
    const foundGame = findProperty('gameId', gameNum)
    updateProps(newGameData, foundGame)
    res.status(201).end('Update successful')
    return
  }
  res.status(404).end('Game ID does not exist')
  return
})

app.delete('/games/gameId=:gameId', (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  if (validateNum(gameNum)) {
    if (existsHelper(gameNum, 'gameId')) {
      const foundGameIndex = findPropertyIndex('gameId', gameNum)
      delGame(foundGameIndex)
      res.status(204).end('Deletion successful')
      return
    }
    res.status(404).end('Game ID does not exist')
    return
  }
  res.status(400).end('Game ID is not a number')
  return
})

app.listen(port, () => {
  console.log(`Steam Games listening on port ${port}`)
  return
})
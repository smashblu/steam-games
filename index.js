const express = require('express')
const app = express()
const port = 3000
const { validateNum, existsHelper, findProperty, findPropertyIndex, updateProps, matchProp, makeList } = require('./service.js')
const { listGames, addGame, delGame } = require('./database.js')

app.use(express.json())

app.get('/games', async (req, res) => {
  res.status(200).send(await listGames())
  return
})

app.post('/games', async (req, res) => {
  const game = req.body
  const gameNum = req.body['gameId']
  if (await existsHelper(gameNum, 'gameId')) {
    res.status(409).end('Game ID already exists, no action taken')
    return
  }
  await addGame(game)
  res.status(201).end('Creation successful')
  return
})

app.get('/games/gameId=:gameId', async (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  if (validateNum(gameNum)) {
    if (await existsHelper(gameNum, 'gameId')) {
      const foundGame = await findProperty('gameId', gameNum)
      res.status(200).send(foundGame)
      return
    }
    res.status(404).end('Game ID does not exist')
    return
  }
  res.status(400).end('Game ID is not a number')
  return
})

app.patch('/games/gameId=:gameId', async (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  const newGameData = req.body
  if (validateNum(gameNum)) {
    if (await existsHelper(gameNum, 'gameId')) {
      if (matchProp(newGameData, 'gameId', gameNum)) {
        res.status(400).end('Game ID cannot be changed')
        return
      }
      const foundGame = await findProperty('gameId', gameNum)
      updateProps(newGameData, foundGame)
      res.status(201).end('Update successful')
      return
    }
    res.status(404).end('Game ID does not exist')
    return
  }
  res.status(400).end('Game ID is not a number')
  return
})

app.delete('/games/gameId=:gameId', async (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  if (validateNum(gameNum)) {
    if (await existsHelper(gameNum, 'gameId')) {
      const foundGameIndex = await findPropertyIndex('gameId', gameNum)
      await delGame(foundGameIndex)
      res.status(204).end('Deletion successful')
      return
    }
    res.status(404).end('Game ID does not exist')
    return
  }
  res.status(400).end('Game ID is not a number')
  return
})

app.get('/games/publisherId=:publisherId', async (req, res) => {
  const pubNum = parseInt(req.params['publisherId'])
  if (validateNum(pubNum)) {
    if (await existsHelper(pubNum, 'publisher', 'publisherId')) {
      const pubList = await makeList(pubNum, 'publisher', 'publisherId')
      res.status(200).send(pubList)
      return
    }
    res.status(404).end('Publisher ID does not exist')
    return
  }
  res.status(400).end('Publisher ID is not a number')
  return
})

const server = app.listen(port, () => {
  console.log(`Steam Games listening on port ${port}`)
  return
})

module.exports = { app, server }

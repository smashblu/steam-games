const express = require('express')
const app = express()
const port = 3000
const { validateNum, findProperty, findPropertyIndex, updateProps, matchProp, makeList } = require('./service.js')
const { findById, existsHelper, listGames, addGame, delGame } = require('./database.js')

app.use(express.json())

app.get('/games', async (req, res) => {
  const filters = req.query
  if (filters.limit && filters.limit <= 100) {
    res.status(200).send(await listGames(filters.limit))
    return
  }
  res.status(200).send(await listGames(25))
  return
})

app.post('/games', async (req, res) => {
  const game = req.body
  const gameNum = req.body['gameId']
  const gameTitle = req.body['title']
  if (await existsHelper('title', gameTitle)) {
    res.status(409).end('Game with same title already exists, no action taken')
    return
  }
  if (game.hasOwnProperty('gameId')) {
    if (await existsHelper('id', gameNum)) {
      res.status(409).end('Game ID already exists, no action taken')
      return
    }
  }
  await addGame(game)
  res.status(201).send(game)
  return
})

app.get('/games/gameId=:gameId', async (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  if (validateNum(gameNum)) {
    const gameTitle = await findById('title', gameNum)
    if (await existsHelper('title', gameTitle)) {
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

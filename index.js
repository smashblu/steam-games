const express = require('express')
const app = express()
const port = 3000
const { validateNum, findProperty, updateProps, matchProp } = require('./service.js')
const { findGames, existsHelper, listGames, addGame, delGame } = require('./database.js')

app.use(express.json())

app.get('/games', async (req, res) => {
  const filters = req.query
  let userLimit = 25
  if (filters.limit && filters.limit <= 100) {
    userLimit = filters.limit
  } 
  res.status(200).send(await listGames(userLimit))
  return
})

app.post('/games', async (req, res) => {
  const gameNum = req.body['gameId']
  const gameTitle = req.body['title']
  const newGameData = req.body
  if (await existsHelper('title', gameTitle)) {
    res.status(409).end('Game with same title already exists, no action taken')
    return
  }
  if (newGameData.hasOwnProperty('gameId')) {
    if (await existsHelper('id', gameNum)) {
      res.status(409).end('Game ID already exists, no action taken')
      return
    }
  }
  await addGame(newGameData)
  res.status(201).send(newGameData)
  return
})

app.get('/games/gameId=:gameId', async (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  if (validateNum(gameNum)) {
    const targetGame = await findGames('games.id', gameNum)
    if (targetGame.length === 0) {
      res.status(404).end('Game ID does not exist')
      return
    }
    res.status(200).send(targetGame)
    return
  }
  res.status(400).end('Game ID is not a number')
  return
})

app.patch('/games/gameId=:gameId', async (req, res) => {
  const gameNum = parseInt(req.params['gameId'])
  const newGameData = req.body
  if (validateNum(gameNum)) {
    if (await existsHelper('id', gameNum)) {
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
    if (await existsHelper('id', gameNum)) {
      await delGame(gameNum)
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
    const targetPub = await findGames('publisher.id', pubNum)
    if (targetPub.length === 0) {
      res.status(404).end('Publisher ID does not exist')
      return
    }
    res.status(200).send(targetPub)
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

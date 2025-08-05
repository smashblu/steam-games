const express = require('express')
const app = express()
const port = 3000

const dummyGames = [
  {
    title: 'Mario'
  }
]

app.get('/games', (req, res) => {
  res.send(dummyGames)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const { listGames } = require('./database.js')

const validateNum = num => {
  if (isNaN(num)) {
    return false
  }
  return true
}

const findProperty = async (el, target) => {
  const gamesObj = await listGames()
  return gamesObj.find((element) => 
  element[el] === target
)}

const findPropertyIndex = async (el, target) => {
  const gamesObj = await listGames()
  return gamesObj.findIndex((element) => 
  element[el] === target
)}

const updateProps = (target, changes) => {
  for (const key of Object.keys(changes)) {
    if (target.hasOwnProperty(key)) {
    changes[key] = target[key]
    }
  }
  return
}

const matchProp = (obj, prop, curr) => {
  if (obj.hasOwnProperty(prop)) {
    if (obj[prop] !== curr) {
      return true
    }
  }
  return false
}

const makeList = async (target, prop, val) => {
  const list = []
  for (game of await listGames()) {
    if (game[prop][val] === target) {
      list.push(game)
    }
  }
  return list
}

module.exports = { validateNum, findProperty, findPropertyIndex, updateProps, matchProp, makeList }

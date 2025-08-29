const { dummyGames } = require('./database.js')

const validateNum = num => {
  if (isNaN(num)) {
    return false
  }
  return true
}

const existsHelper = (target, val) => {
  for (item of dummyGames) {
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

const findPropertyIndex = (el, target) => {
  return dummyGames.findIndex((element) => 
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

const makeList = (target, prop, val) => {
  const list = []
  for (game of dummyGames) {
    if (game[prop][val] === target) {
      list.push(game)
    }
  }
  return list
}

module.exports = { validateNum, existsHelper, findProperty, findPropertyIndex, updateProps, matchProp, makeList }
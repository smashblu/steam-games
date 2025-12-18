const { listGames } = require('./database.js')

const validateNum = num => {
  if (isNaN(num)) {
    return false
  }
  return true
}

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

module.exports = { validateNum, updateProps, matchProp }

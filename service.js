const validateNum = num => {
  if (isNaN(num)) {
    return false
  }
  return true
}

module.exports = { validateNum }
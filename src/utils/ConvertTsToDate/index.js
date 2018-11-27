const compareToTen = getTimeFunc => {
  return getTimeFunc < 10 ? `0${getTimeFunc}` : getTimeFunc
}

const convertTsToDate = timestamp => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = compareToTen(date.getDay())
  const hour = compareToTen(date.getHours())
  const minute = compareToTen(date.getMinutes())
  const second = compareToTen(date.getSeconds())
  return `${year}.${month}.${day} ${hour}:${minute}:${second}`
}

export {
  convertTsToDate,
}

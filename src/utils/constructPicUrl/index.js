import { config } from '../../config'

const constructPicUrl = (name) => {
  return `${config.prefixUrl}${name}${config.imgSlim}`
}

export {
  constructPicUrl,
}

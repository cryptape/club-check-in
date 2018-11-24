import * as qiniu from 'qiniu-js'
import * as CryptoJS from 'crypto-js'
import { base64encode, safe64, utf16to8 } from './CryptoMethod'
import { config } from '../config'

const log = console.log.bind(console, '### utils')

// token valid for next 1 hour
const calcDeadLine = () => {
  return Math.round(new Date().getTime() / 1000) + 3600
}

const errorCode = {
  413: '图片大于512KB O(∩_∩)O~',
  403: '上传的不是图片哦 O(∩_∩)O~~'
}

const generateUpToken = () => {
  const accessKey = config.qiniuAccessKey
  const secretKey = config.qiniuSecretKey
  const putPolicyObj = {
    'scope': config.qiniuBucket,
    'deadline': calcDeadLine(),
    // can only upload image
    'mimeLimit': 'image/\*',
  }
  const putPolicy = JSON.stringify(putPolicyObj)
  const encoded = base64encode(utf16to8(putPolicy))
  const hash = CryptoJS.HmacSHA1(encoded, secretKey)
  const encodedSigned = hash.toString(CryptoJS.enc.Base64)
  // return uploadToken
  return `${accessKey}:${safe64(encodedSigned)}:${encoded}`
}

const upload = (file, name) => {
  const token = generateUpToken()
  const config = {
    useCdnDomain: true,
  }
  const putExtra = {
    fname: '',
    params: {},
    mimeType: [] || null,
  }
  const observable = qiniu.upload(file, name, token, putExtra, config)
  return new Promise((resolve, reject) => {
    observable.subscribe({
      next(res) {
        log('next', res)
      },
      error(err) {
        // log('err', err)
        reject(err)
      },
      complete(res) {
        log('done', res)
        resolve(res)
      },
    })
  })
}

const handleUploadImage = (files) => {
  const timestamp = Math.round(new Date().getTime() / 1000)
  if (files[0]) {
    const imgData = files[0].url
    const name = `${files[0].file.name}${timestamp}`
    log(name, timestamp)
    return fetch(imgData)
      .then(img => img.blob())
      .then(data => upload(data, name))
  }
}

const timeConverter = (UNIX_timestamp) => {
  const a = new Date(UNIX_timestamp * 1000)
  const year = a.getFullYear()
  const month = a.getMonth() + 1
  const date = a.getDate()
  const hour = a.getHours()
  const min = a.getMinutes()
  const sec = a.getSeconds()
  return `${year}.${month}.${date} ${hour}:${min}:${sec} `
}

export {
  handleUploadImage,
  errorCode,
  timeConverter,
}

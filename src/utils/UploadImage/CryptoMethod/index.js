const utf16to8 = str => {
  let out, i, len, c
  out = ''
  len = str.length
  for (let i = 0; i < len; i++) {
    c = str.charCodeAt(i)
    if ((c >= 0x0001) && (c <= 0x007F)) {
      out += str.charAt(i)
    } else if (c > 0x07FF) {
      out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F))
      out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    } else {
      out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F))
      out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F))
    }
  }
  return out
}

const base64EncodeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

const base64encode = str => {
  let out, i, len
  let c1, c2, c3
  len = str.length
  i = 0
  out = ''
  while (i < len) {
    c1 = str.charCodeAt(i++) & 0xff
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt((c1 & 0x3) << 4)
      out += '=='
      break
    }
    c2 = str.charCodeAt(i++)
    if (i === len) {
      out += base64EncodeChars.charAt(c1 >> 2)
      out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
      out += base64EncodeChars.charAt((c2 & 0xF) << 2)
      out += '='
      break
    }
    c3 = str.charCodeAt(i++)
    out += base64EncodeChars.charAt(c1 >> 2)
    out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4))
    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6))
    out += base64EncodeChars.charAt(c3 & 0x3F)
  }
  return out
}

const safe64 = (base64) => {
  base64 = base64.replace(/\+/g, '-')
  base64 = base64.replace(/\//g, '_')
  return base64
}

export {
  utf16to8,
  base64encode,
  safe64,
}

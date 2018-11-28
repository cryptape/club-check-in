const checkOs = () => {
  const userAgent = navigator.userAgent
  let str = userAgent.split('Neuron(')[1]
  if (str === undefined) {
    console.warn('Not found Neuron info')
    return 'web'
  } else {
    str = str.split(')')[0]
    let info = {}
    const keytable = {
      Platform: 'platform',
      AppVersion: 'version',
    }
    str.split('&').forEach(s => {
      const l = s.split('=')
      const key = keytable[l[0]] || l[0].toLowerCase()
      info[key] = l[1].toLowerCase()
    })
    return info.platform
  }
}

const ChangeTitle = (name, type) => {

  const osNow = checkOs()
  if(osNow === 'android') {
    const title = { title: { name: name, }, left: { type: type }, }
    window.webTitleBar.getTitleBar(JSON.stringify(title))
  }
}

export {
  ChangeTitle,
}

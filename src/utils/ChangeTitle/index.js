const ChangeTitle = (name, type) => {
  const title = { title: { name: name, }, left: { type: type }, }
  window.webTitleBar.getTitleBar(JSON.stringify(title))
}

export {
  ChangeTitle,
}

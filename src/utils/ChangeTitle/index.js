const ChangeTitle = (name, type) => {
  // const checkOs = () => {
  //   var userAgent = navigator.userAgent;
  //   var str = userAgent.split("Neuron(")[1];
  //   if (str === undefined) {
  //     console.warn("Not found Neuron info");
  //     this.os = "web";
  //   } else {
  //     str = str.split(")")[0];
  //     var info = {};
  //     var keytable = {
  //       Platform: "platform",
  //       AppVersion: "version"
  //     };
  //     str.split("&").forEach(s => {
  //       var l = s.split("=");
  //       var key = keytable[l[0]] || l[0].toLowerCase();
  //       info[key] = l[1].toLowerCase();
  //     });
  //     this.os = info.platform;
  //   }
  // }
  const title = { title: { name: name, }, left: { type: type }, }
  window.webTitleBar.getTitleBar(JSON.stringify(title))
}

export {
  ChangeTitle,
}

# club-check-in

At present, punching cards in WeChat group can not effectively save historical punching records and pictures, and can not view the punching data in the cycle. Through the club-check-in DApp, users can better display the data and encourage the members to participate in the club activities.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org)
- [Neuron Wallet (Android)](https://github.com/cryptape/neuron-android)
- [Neuron Wallet (iOS)](https://github.com/cryptape/neuron-ios)
- [qiniu](https://www.qiniu.com/)

To check if node is installed:

```shell
$ node -v
v8.11.4  // version may be different
```

### Installing

1.Download repo

```shell
git clone https://github.com/cryptape/club-check-in
```

2.Install Dependencies

```shell
yarn install
```

3.Configuration

Create `src/config.js`, `public/manifest.json`, 

```shell
cp src/config.js.example src/config.js

cp public/manifest.json.example public/manifest.json
```

Set all parameters

In `src/config.js`
```javascript
const config = {
  chain: '',  // chain address
  userContract: '', // player contract address
  tokenContract: '', // token contract address
  clubContract: '', // club contract address
  qiniuAccessKey: '', // qiniu AK
  qiniuSecretKey: '', // qiniu SK
  qiniuBucket: '', // image bucket name
  prefixUrl: '', // qiniu bucket url
  imgSlim: '', // qiniu image slim url
}
```

`Parameters`

- `chain` - `String`: chain address
- `userContract` - `String`: player contract address 
- `tokenContract` - `String`: token contract address
-  `clubContract` - `String`: club contract address
- `qiniuAccessKey` - `String`: qiniu AK
- `qiniuSecretKey` - `String`: qiniu SK
- `qiniuBucket` - `String`: image bucket name
- `prefixUrl` - `String`: qiniu bucket url
- `imgSlim`- `String`: qiniu image slim url

In `manifest.json`

```javascript
{
  "short_name": "club check in",
  "name": "club check in",
  "chainSet" :{
    "1": ""
  },
  "icons": [
    {
      "src": "",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

- `chainSet` - `String`: chain address you want to interact with

4.Start your server

```shell
yarn start
```
Server is running on `http://localhost:3000/` when info below display in your shell.

```shell
Compiled successfully!

You can now view club-check-in in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://xxx.xxx.xx.xx:3000/

Note that the development build is not optimized.
To create a production build, use yarn build.
```

## Deployment

### Instructions

1.Use webpack to generate production version

```shell
yarn build
```

2.Rename and pack `build` folder

```shell
club-check-in > mv build club-check-in  
club-check-in > tar -zcvf club-check-in.tar.gz club-check-in  
```

3.Upload club-check-in.tar.gz to server

```shell
scp club-check-in.tar.gz user@remote:/tmp  //use your own server address
```

4.Login your server

```shell
ssh user@remote //use your own server address
```

5.Unpack club-check-in

```shell
cd /tmp
mv club-check-in.tar.gz /var/www
cd /var/www
tar -zxvf club-check-in.tar.gz  // Unpack club-check-in
```

6.Use a static files server, e.g. [NGINX](https://www.nginx.com/) to serve the club-check-in directory

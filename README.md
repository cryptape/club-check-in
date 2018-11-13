# club-check-in
Front-end of club-check-in


## Deployment

### Instructions

0.Install all dependencies

```shell
yarn install
```

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

5.Unpack ether-bridge

```shell
cd /tmp
mv club-check-in.tar.gz /var/www
cd /var/www
tar -zxvf club-check-in.tar.gz  // Unpack club-check-in
```

6.Use a static files server, e.g. [NGINX](https://www.nginx.com/) to serve the club-check-in directory

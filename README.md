# Remote Voting

## Steps

First, make sure you have [golang](https://golang.org/dl/) and [IPFS](https://dist.ipfs.io/#go-ipfs) installed

### IPFS

1) Configuration
```sh
$ ipfs init
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Origin '[\"*\"]'
$ ipfs config --json API.HTTPHeaders.Access-Control-Allow-Methods '[\"PUT\", \"GET\", \"POST\"]'
```

2) Start the daemon
```sh
$ ipfs daemon
```

### Main app
cd into the root directory of the app and run

```sh
$ npm install
```

Start testnet

```sh
$ npm run ganache
```

Open another tab and type the following commands

```sh
$ npm run make
$ npm run dev
```

Headover to localhost:{port_number} (Mostly 8081)

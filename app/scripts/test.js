let ipfsApi = require('ipfs-api')

let ipfs = ipfsApi('localhost', 5001, { protocol: 'http' })

function helloWorld () {
	console.log("Hello world")
	let userJson = {
		username: "Arvind",
		title: "Hello ipfs"
	}
	ipfs.id()
		.then((res) => {
			console.log("Connected to IPFS node!", res.id, res.agentVersion, res.protocolVersion)
		})
	ipfs.files.add({
		path: '/tmp/user.json',
		content: Buffer(JSON.stringify(userJson))
	}).then((res) => {
		console.log("File added " + res[0].hash)
	}).catch((err) => {
		console.log(err)
	})
}

helloWorld()

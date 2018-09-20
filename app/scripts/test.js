let ipfsApi = require('ipfs-api')

let ipfs = ipfsApi('localhost', 5001, { protocol: 'http' })

export function helloWorld () {
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

export function upload (file, filename) {
	var reader = new FileReader()
	reader.onload = function () {
		console.log("Reader")
		console.log(reader)
		ipfs.files.add([Buffer.from(reader.result)])
			.then((res) => {
				console.log("File added " + res[0].hash)
			}).catch((err) => {

				console.log(err)
			})
	}
	reader.readAsArrayBuffer(file)
}

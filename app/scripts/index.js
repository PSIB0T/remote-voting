// Import the page's CSS. Webpack will know what to do with it.
import '../styles/app.css'

// Import libraries we need.
import { default as Web3 } from 'web3'
import { default as contract } from 'truffle-contract'
import $ from "jquery"

// Import our contract artifacts and turn them into usable abstractions.
import votingArtifact from '../../build/contracts/Voting.json'
import voteArtifact from '../../build/contracts/Vote.json'

// MetaCoin is our usable abstraction, which we'll use through the code below.
// const MetaCoin = contract(metaCoinArtifact)

// The following code is simple to show off interacting with your contracts.
// As your needs grow you will likely need to change its form and structure.
// For application bootstrapping, check out window.addEventListener below.
let accounts
let account
let Voting, Vote
let candidates = { "Rama": "candidate-1", "Nick": "candidate-2", "Jose": "candidate-3" }
const App = {
	upload: async function () {
		try {
			let input = $("#fileinput").prop('files')[0]
			let { upload } = await import('./test')
			upload(input, input.name)
		} catch (err) {
			console.log(err)
		}
	},
	start: function () {
		// Bootstrap the MetaCoin abstraction for Use.
		Voting = contract(votingArtifact)
		Vote = contract(voteArtifact)
		Voting.setProvider(web3.currentProvider)
		Vote.setProvider(web3.currentProvider)
		let candidateNames = Object.keys(candidates)
		for (var i = 0; i < candidateNames.length; i++) {
			let name = candidateNames[i]
			Voting.deployed().then(function (contractInstance) {
				contractInstance.totalVotesFor.call(name).then(function (v) {
					$("#" + candidates[name]).html(v.toString())
				})
			})
		}
		// Get the initial account balance so it can be displayed.
		web3.eth.getAccounts(function (err, accs) {
			if (err != null) {
				alert('There was an error fetching your accounts.')
				return
			}

			if (accs.length === 0) {
				alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
				return
			}

			accounts = accs
			account = accounts[0]

			console.log(account)
		})
	},
	checkCandidate: function () {
		Vote.deployed().then((contractInstance) => {
			contractInstance.validCandidate.call(web3.eth.accounts[0])
				.then((v) => {
					console.log(v)
				}).catch((err) => {
					console.log(err)
				})
		})
	},
	registerCandidate: function () {
		Vote.deployed().then((contractInstance) => {
			contractInstance.regCandidate({ gas: 140000, from: web3.eth.accounts[0] })
				.then((v) => {
					console.log("Candidate registered successfully")
				}).catch((err) => {
					console.log(err)
				})
		})
	},

	addVote: function () {
		Vote.deployed().then(function (contractInstance) {
			contractInstance.add({ gas: 140000, from: web3.eth.accounts[0] }).then(function (v) {
				console.log(v)
				return contractInstance.ownerOf.call(0)
			}).then((v) => {
				console.log(v.toString())
			}).catch((err) => {
				console.log(err)
			})
		})
	},

	checkVote: function () {
		Vote.deployed().then(function (contractInstance) {
			contractInstance.balanceOf.call(web3.eth.accounts[0]).then((v) => {
				console.log(v.toString())
			})
		})
	},

	checkVoteOwner: function () {
		let token = $("#candidate").val()
		Vote.deployed().then(function (contractInstance) {
			contractInstance.ownerOf.call(token).then((v) => {
				console.log(v.toString())
			})
		})
	},

	transferVote: function () {
		let address = $("#candidate").val()
		let token = 3
		Vote.deployed().then(function (contractInstance) {
			contractInstance.approve(address, token, { gas: 140000, from: web3.eth.accounts[0] }).then(function () {
				return contractInstance.ownerOf.call(token)
			}).then((v) => {
				console.log(v.toString())
			}).catch((err) => {
				console.log(err)
			})
		})
	},

	takeOwnership: function () {
		let token = $("#candidate").val()
		Vote.deployed().then(function (contractInstance) {
			contractInstance.takeOwnership(token, { gas: 140000, from: web3.eth.accounts[0] }).then(function () {
				return contractInstance.ownerOf.call(token)
			}).then((v) => {
				console.log(v.toString())
			}).catch((err) => {
				console.log(err)
			})
		})
	},

	voteForCandidate : function () {
		$("#msg").html(`Vote has been submitted. The vote count will increment as soon as 
						the vote is recorded on the blockchain. Please wait.`)
		let candidateName = $("#candidate").val()
		Voting.deployed().then(function (contractInstance) {
			contractInstance.voteForCandidate(candidateName, { gas: 140000, from: web3.eth.accounts[0] }).then(function () {
				let divId = candidates[candidateName]
				return contractInstance.totalVotesFor.call(candidateName).then(function (v) {
					$("#" + divId).html(v.toString())
					$("#msg").html("")
				})
			})
		})
	}
}

window.App = App

$('document').ready(() => {
	if (typeof web3 !== 'undefined') {
		console.warn(
			'Using web3 detected from external source.' +
      ' If you find that your accounts don\'t appear or you have 0 MetaCoin,' +
      ' ensure you\'ve configured that source properly.' +
      ' If using MetaMask, see the following link.' +
      ' Feel free to delete this warning. :)' +
      ' http://truffleframework.com/tutorials/truffle-and-metamask'
		)
		// Use Mist/MetaMask's provider
		window.web3 = new Web3(web3.currentProvider)
	} else {
		console.warn(
			'No web3 detected. Falling back to http://127.0.0.1:9545.' +
      ' You should remove this fallback when you deploy live, as it\'s inherently insecure.' +
      ' Consider switching to Metamask for development.' +
      ' More info here: http://truffleframework.com/tutorials/truffle-and-metamask'
		)
		// fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
		window.web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:9545'))
	}

	App.start()
})

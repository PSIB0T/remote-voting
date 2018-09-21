var Voting = artifacts.require('./Voting.sol')
var Vote = artifacts.require('./Vote.sol')
module.exports = function (deployer) {
	deployer.deploy(Voting, ['Rama', 'Nick', 'Jose'], { gas: 6700000 })
	deployer.deploy(Vote, { gas: 6700000 })
}

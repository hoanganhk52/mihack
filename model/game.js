const mongoose = require('mongoose');
const User = require('./user.js');

const GameSchema = new mongoose.Schema({
	users: [
		{
			userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
			userName: {type: String}
		}
	],
	round: [
		[
			{
				userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
				score: {type: Number, default: 0}
			}
		]
	]
});

module.exports = mongoose.model('Game', GameSchema);
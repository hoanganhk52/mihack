const mongoose = require('mongoose');
const User = require('./user.js');

const GameSchema = new mongoose.Schema({
	user: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
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
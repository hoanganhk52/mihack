const mongoose = require('mongoose');
const User = require('./user.js');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
	users: [
		{
			userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
			userName: {type: String}
		}
	],
	rounds: [
		[
			{
				userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
				score: {type: Number, default: 0}
			},
			{
				_id : false
			}
		]
	]
});

module.exports = mongoose.model('Game', GameSchema);
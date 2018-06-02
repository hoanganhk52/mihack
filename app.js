const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const bodyParser = require('body-parser');
const _ = require('lodash');
const fs = require('fs');
const helpers = require('handlebars-helpers')();
const {mongoose} = require('./db/mongoose');
const UserModel = require('./model/user.js');
const GameModel = require('./model/game.js');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({extended: false}));

app.post('/game', function (req, res) {
	let users = [];

	let user1 = new UserModel({
		username: req.body.username1
	});
	let user2 = new UserModel({
		username: req.body.username2
	});
	let user3 = new UserModel({
		username: req.body.username3
	});
	let user4 = new UserModel({
		username: req.body.username4
	});

	let savegame = async function () {
		await user1.save().then((user) => {
			users.push(user._id);
		});
		await user2.save().then((user) => {
			users.push(user._id);
		});
		await user3.save().then((user) => {
			users.push(user._id);
		});
		await user4.save().then((user) => {
			users.push(user._id);
		});

		let newGame = new GameModel({
			user: users
		});

		newGame.save().then((newGame) => {
			res.redirect(`/game/${newGame._id}`);
		}).catch((e) => {
			res.status(400).send(e);
		});
	};

	savegame();
});


app.get('/', function (req, res) {
	res.render('home');
});

app.get('/game/:id', (req, res) => {
	GameModel.findById(req.params.id, (err, game) => {
		res.render('game', {game})
	});
});

app.listen(8080, function (err) {
	if (err) console.log(err);
	console.log('server is ok');
});
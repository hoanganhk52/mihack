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
app.use(bodyParser.urlencoded({extended: true}));

app.post('/game', function (req, res) {
	let users = [];

	req.body.username.forEach((username) => {
		users.push({username: username});
	});

	let saveGame = async function () {
		let savedUsers = await UserModel.create(users);
		return GameModel.create({user: savedUsers.map(user => user._id)});
	};

	saveGame().then(game => {
		res.redirect(`/game/${game._id}`);
	}).catch((e) => {
		res.send(e);
	});
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
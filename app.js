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

//routers:
const GameRouter = require('./router/gameRouter');
app.use('/game', GameRouter);


app.get('/', function (req, res) {
	res.render('home');
});

app.listen(8080, function (err) {
	if (err) console.log(err);
	console.log('server is ok');
});
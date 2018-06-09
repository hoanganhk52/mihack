const express = require('express');
const Router = express.Router();
const UserModel = require('../model/user.js');
const GameModel = require('../model/game.js');


Router.post('/', function (req, res) {
    let users = [];

	req.body.username.forEach((username) => {
        users.push({userName: username});
    });
    
	let saveGame = async function() {
        let savedUsers = await UserModel.create(users);
		return GameModel.create({users: savedUsers.map((item, index) => {
            delete item.__v;
			return item;
		})});
	};

	saveGame().then(game => {
		res.redirect(`/game/${game._id}`);
	}).catch((e) => {
		res.send(e);
	});
});

Router.get('/:id', (req, res) => {
	GameModel.findById(req.params.id, (err, game) => {
		res.render('game', {game})
	});
});

Router.get('/:id/add-round', (req, res)=>{
    GameModel.findById(req.params.id, (err, game) => {
		res.render('newround', {game})
	});
    
})

Router.post('/:id/save', (req,res)=>{
    let scores = req.body.scores;
    let users =[];

    GameModel
    .findById(req.params.id)
    .then(gameFound=>{
        //create users
        let userIds = getGameUserIds(gameFound);
        userIds.forEach((userId)=>{
            users.push({
                userId: userId,
                score: scores[userIds.indexOf(userId)]
            });
        });
       
        gameFound.rounds.push(users);
        
        gameFound.save((err)=>{
            if(err) console.log(err)
            else res.redirect(`/game/${gameFound._id}`);
        })
    })
    .catch(err=> console.log(err));
})

// functions
const getGameUserIds = function(game){
    let userIds = [];
    
    game.users.forEach( (user)=>{
        userIds.push(user._id);
    });
    // console.log(userIds);
    return userIds;
};



module.exports = Router;
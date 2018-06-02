const express = require('express');
const Router = express.Router();
const QuestionModel = require('./../model/question.model');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

Router.get('/:id', function (req, res) {
	let questionID = req.params.id;

	if (!ObjectID.isValid(questionID)) {
		res.status(404).send('Page not found');
	} else {
		QuestionModel.findById(questionID).then((question) => {
			if (!question) {
				res.status(404).send('Page not found');
			} else {
				res.render('question', {
					question,
					yesPercent: _.round((question.yes / (question.no + question.yes)) * 100, 2),
					noPercent: _.round((question.no / (question.no + question.yes)) * 100, 2)
				});//_.round(num * 100, roundingPrecision),
			}
		}).catch((e) => {
			res.status(400).send(e);
		});
	}
});

//vote
Router.put('/', function (req, res) {
	let vote = req.body.vote;
	let questionID = req.body.questionID;

	if (!ObjectID.isValid(questionID)) {
		res.status(404).send('Page not found');
	} else {
		QuestionModel.findById(questionID).then((question) => {
			if (!question) {
				res.status(404).send('Page not found');
			} else {
				question[vote] += 1;
				question.save((err) => {
					if (err) res.status(404).send('Page not found');
					else res.redirect(`/question/${question._id}`);
				});

				//delete: question.remove()
			}
		}).catch((e) => {
			res.status(400).send(e);
		});
	}
});

module.exports = Router;
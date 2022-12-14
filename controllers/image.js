const clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: 'd14286fa5d9f43c48bec6fe99b48309c'
});

const handleAPICall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('Unable to work with API'))
}

const handleImage = (req, res, db) => {
	const { id } = req.body;
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0].entries);
	})
	.catch(err => res.status(400).json('Unable to get entries'))
}

module.exports = {
	handleImage,
	handleAPICall
};
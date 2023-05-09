const checkBody = (req, res, next) => {
	if (!req.body.id){
		return res.status(400).send("Id field required.");
	}
	if (!req.body.title){
		return res.status(400).send("Title field required.");
	}
	if (!req.body.reviews){
		return res.status(400).send("Reviews field required.");
	}

	next();
}

module.exports.checkBody = checkBody;
/* GET about page */
module.exports.about = function (req, res) {
    res.render('generic-text', { title: 'About' });
}

module.exports.home = function(req, res) {
	res.render('index', 
		{ title: 'Welcome',
			blurb11: 'Need a gift?',
            blurb12: 'Stuck for what to buy?',
            blurb13: 'Just wish it were over and done with?',
            blurb14: "Not to worry, you're not alone.",
            blurb15: "Let us do the work for you." ,
            blurb21: "The Prezigen platform is designed to alleviate the stress surrounding present finding. Very few wish to spend hours puzzled thinking of the perfect gift idea and deal with themadness of reaching retail outlets before they close.",
            blurb22: "The Prezigen service is designed for you.",
            blurb23: "Build the gift receivers profile and allow us to generate a list of tailored gift ideas for you to choose from in just a few simple steps.",
            blurb24: "Prezigen takes all the stress out thinking and provides you with tailoredoptions so that you may take the credit of hunting down that perfect gift...   "
	});
}

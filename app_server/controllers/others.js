/* GET about page */
module.exports.about = function (req, res) {
    res.render('generic-text', { title: 'About' });
}

module.exports.home = function(req, res) {
	res.render('index', 
		{ title: 'Prezigen',
			blurb: 'Prezigen help you blah blah blah blah blah blah blah blah.'
	});
}
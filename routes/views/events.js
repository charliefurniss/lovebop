var keystone = require('keystone');

exports = module.exports = function(req, res) {
	
	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'events';

	// Load the testimonials by sortOrder
	view.query('events', keystone.list('Event').model.find().sort('sortOrder'));
	
	// Render the view
	view.render('events');
	
};

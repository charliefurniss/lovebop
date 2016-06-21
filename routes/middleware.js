/**
 * This file contains the common middleware used by your routes.
 * 
 * Extend or replace these functions as your application requires.
 * 
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */

var _ = require('underscore');
var keystone = require('keystone');


/**
	Initialises the standard view locals
	
	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/

exports.initLocals = function(req, res, next) {
	
	var locals = res.locals;
	
	locals.navLinks = [
		{ label: 'HOME',		key: 'home',		href: '/' },
		{ label: 'ABOUT',		key: 'about',		href: '/about' },
		{ label: 'EVENTS',		key: 'events',		href: '/events' },
		{ label: 'TICKETS',		key: 'tickets',		href: '/tickets' },
		//{ label: 'GALLERY',		key: 'gallery',		href: '/gallery' },
		//{ label: 'MIXES',		key: 'mixes',		href: '/mixes' },
		//{ label: 'TESTIMONIALS',		key: 'testimonials',		href: '/testimonials' },
		{ label: 'BLOG',		key: 'blog',		href: '/blog' },
		{ label: 'SIGN UP',		key: 'registration',	href: '/registration' }
	];
	
	locals.user = req.user;

	locals.baseUrl = keystone.get('baseUrl');
	
	next();
	
};


/**
	Fetches and clears the flashMessages before a view is rendered
*/

exports.flashMessages = function(req, res, next) {
	
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error')
	};
	
	res.locals.messages = _.any(flashMessages, function(msgs) { return msgs.length; }) ? flashMessages : false;
	
	next();
	
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */

exports.requireUser = function(req, res, next) {
	
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
	
};

// Simulate config options from your production environment by
// customising the .env file in your project's root folder.
require('dotenv').load();

// Require keystone
var keystone = require('keystone');
var handlebars = require('express-handlebars');

// Initialise Keystone with your project's configuration.
// See http://keystonejs.com/guide/config for available options
// and documentation.

keystone.init({

	'name': 'Lovebop',
	'brand': 'Lovebop',
	
	'sass': 'public',
	'static': 'public',
	'favicon': 'public/favicon.ico',
	'views': 'templates/views',
	'view engine': 'hbs',
	
	'custom engine': handlebars.create({
		layoutsDir: 'templates/views/layouts',
		partialsDir: 'templates/views/partials',
		defaultLayout: 'default',
		helpers: new require('./templates/views/helpers')(),
		extname: '.hbs'
	}).engine,
	
	'emails': 'templates/emails',
	
	'auto update': true,
	'session': true,
	'auth': true,
	'user model': 'User',
	// 'cookie secret': '18597e80fd52f26fae5c0805d37fabd4b07e06ece51159c83152f52a6f716daf142e49bed41310d53d3d705a3e7ee0f8b8b37ce9d5bbd1a902c475b123bfe143',
	'cloudinary config': 'cloudinary://644185718342363:BbnaI4MW1m3UuVzfWPjgA72UXrM@lovebop',

	// 'env': process.env.NODE_ENV || "development",

	// 'mongo': "mongodb://localhost/lovebop" || process.env.MONGO_URI
});

// Load your project's Models

keystone.import('models');

// Setup common locals for your templates. The following are required for the
// bundled templates and layouts. Any runtime locals (that should be set uniquely
// for each request) should be added to ./routes/middleware.js

keystone.set('locals', {
	_: require('underscore'),
	env: keystone.get('env'),
	utils: keystone.utils,
	editable: keystone.content.editable
});

keystone.set('google api key', 'AIzaSyDUE6cz9u8m_GraIXa3hhPgDlje1V1s6As');
keystone.set('google server api key', 'process.env.GOOGLE_SERVER_KEY');

// keystone.set('cloudinary config', { cloud_name: 'lovebop', api_key: '644185718342363', api_secret: 'BbnaI4MW1m3UuVzfWPjgA72UXrM' });

keystone.set('baseUrl', (keystone.get('env') == 'production') ? 'https://lovebop.herokuapp.com/' : 'http://localhost:3000/');

// Load your project's Routes

keystone.set('routes', require('./routes'));


// Setup common locals for your emails. The following are required by Keystone's
// default email templates, you may remove them if you're using your own.

keystone.set('email locals', {
	logo_src: '/images/logo-email.gif',
	logo_width: 194,
	logo_height: 76,
	theme: {
		email_bg: '#f9f9f9',
		link_color: '#2697de',
		buttons: {
			color: '#fff',
			background_color: '#2697de',
			border_color: '#1a7cb7'
		}
	}
});

// Setup replacement rules for emails, to automate the handling of differences
// between development a production.

// Be sure to update this rule to include your site's actual domain, and add
// other rules your email templates require.

keystone.set('email rules', [{
	find: '/images/',
	replace: (keystone.get('env') == 'production') ? 'http://www.lovebop.co.uk/images/' : 'http://localhost:3000/images/'
}, {
	find: '/keystone/',
	replace: (keystone.get('env') == 'production') ? 'http://www.lovebop.co.uk/keystone/' : 'http://localhost:3000/keystone/'
}]);

// Load your project's email test routes

keystone.set('email tests', require('./routes/emails'));

// Configure the navigation bar in Keystone's Admin UI

keystone.set('nav', {
	'posts': ['posts', 'post-categories'],
	'galleries': 'galleries',
	'registrations': 'registrations',
	'users': 'users',
	'testimonials': 'testimonials',
	'events': 'events'
});

// Start Keystone to connect to your database and initialise the web server

keystone.start();

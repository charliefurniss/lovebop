var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Registration Model
 * =============
 */

var Registration = new keystone.List('Registration', {
	nocreate: true,
	noedit: true
});

Registration.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	// enquiryType: { type: Types.Select, options: [
	// 	{ value: 'Registration', label: 'Please let me know about what\'s happening with LoveBop' }
	// ] },
	// message: { type: Types.Markdown},
	createdAt: { type: Date, default: Date.now }
});

Registration.schema.pre('save', function(next) {
	this.wasNew = this.isNew;
	next();
});

Registration.schema.post('save', function() {
	if (this.wasNew) {
		this.sendNotificationEmail();
	}
});

Registration.schema.methods.sendNotificationEmail = function(callback) {
	
	if ('function' !== typeof callback) {
		callback = function() {};
	}
	
	var enquiry = this;
	
	keystone.list('User').model.find().where('isAdmin', true).exec(function(err, admins) {
		
		if (err) return callback(err);
		
		new keystone.Email('enquiry-notification').send({
			to: admins,
			from: {
				name: 'LoveBop',
				email: 'contact@lovebop.com'
			},
			subject: 'New Enquiry for LoveBop',
			enquiry: enquiry
		}, callback);
		
	});
	
};

Registration.defaultSort = '-createdAt';
Registration.defaultColumns = 'name, email, createdAt';
Registration.register();

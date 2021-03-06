var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Event Model
 * =============
 */

var Event = new keystone.List('Event', {
	map: { name: 'title' },
	autokey: { from: 'name', path: 'key', unique: true }
});

Event.add({ 
    title: { type: String, required: true },
    name: { type: String },
    venue: { type: String },
    address1: { type: String },
    address2: { type: String },
    city: { type: String },
    postcode: { type: String },
    location_url: { type: String },
    date: { type: Types.Date },
    start_at: { type: String },
    end_at: { type: String },
    ticket_url: { type: String }
});


Event.defaultColumns = 'title, location, date, start_at, end_at';
Event.register();
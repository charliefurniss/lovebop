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
    location: { type: String },
    location_url: { type: String },
    date: { type: Types.Date, format: "D MMM YYYY" },
    start_at: { type: Date, format: "HH:mm" },
    end_at: { type: Date, format: "HH:mm" },
    price: { type: Types.Money, currency: 'en-gb' }
});


Event.defaultColumns = 'title, location, date, start_at, end_at';
Event.register();
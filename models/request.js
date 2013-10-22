var mongoose = require('mongoose')
	, Schema   = mongoose.Schema;

var RequestSchema = new Schema({
	url: { type: String },
	date: { type: Date, default: Date.now },
	referrer: { type: String },
	method: { type: String },
	useragent: { type: String },
	ip: { type: String }
});

mongoose.model('Request', RequestSchema);
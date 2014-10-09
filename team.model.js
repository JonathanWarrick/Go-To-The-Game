var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	market: String,
	teamName: String,
	winPct: Number
});

module.exports = mongoose.model('Team', TeamSchema);

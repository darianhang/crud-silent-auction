const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidderSchema = new Schema({
	name: {
		type: String,
		required: true
	},
    bidItem: {
		type: String,
		required: true
	},
	bidAmount: {
		type: Number,
		default: 0
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const Bidder = mongoose.model("Bidder", bidderSchema);

module.exports = Bidder;
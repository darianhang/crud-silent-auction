const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidItemSchema = new Schema({
	itemName: {
		type: String,
		required: true
	},
	currentBid: {
		type: Number,
		default: 0
	},
	img: {
		type: String,
		required: true
	},
	itemDescription: {
		type: String,
		required: true
	},
	timestamp: {
		type: String,
		default: Date.now()
	}
});

const BidItem = mongoose.model("BidItem", bidItemSchema);

module.exports = BidItem;
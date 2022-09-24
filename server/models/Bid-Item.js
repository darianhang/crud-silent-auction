const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bidItemSchema = new Schema({
	itemName: {
		type: String,
		required: true
	},
	img: {
		type: String,
		required: true
	},
	itemDescription: {
		type: String,
		required: true
	},
	bids: [{
		name: String,
		bid: Number
	}]
});

const BidItem = mongoose.model("BidItem", bidItemSchema);

module.exports = BidItem;
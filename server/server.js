const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(express.json());
app.use(cors());

MongoDB = "mongodb+srv://durianhang:durianadmin@cluster0.vqcxcdk.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(process.env.MONGODB_URL || MongoDB, {
	useNewUrlParser: true, 
	useUnifiedTopology: true 
}).then(() => console.log(`Connected to MongoDB on ${process.env.PORT || 3001}`)).catch(console.error);

// Models
const BidItem = require('./models/Bid-Item');

app.get('/', (req, res) => { res.send('Hello from Express!')})

app.get('/BidItems', async (req, res) => {
	const item = await BidItem.find();
	res.json(item);
});

app.post('/BidItems/new', (req, res) => {
	const item = new BidItem({
		itemName: req.body.itemName,
		img: req.body.img,
		itemDescription: req.body.itemDescription,
		bids: req.body.bids,
	})

	item.save();

	res.json(item);
});

app.put('/BidItems/update/:id', async (req, res) => {
	await BidItem.updateOne({ _id: req.params.id },
		{ $push: { bids: {name: req.body.bids.name,
		bid: req.body.bids.bid}   } })
		const updatedItem = await BidItem.findById(req.params.id);
		return res.status(200).json(updatedItem);
	})


app.delete('/bidItems/delete/:id', async (req, res) => {
	const result = await BidItem.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.listen(process.env.PORT || 3001);
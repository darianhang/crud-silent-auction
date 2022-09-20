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
const Bidder = require('./models/Bidders');

 app.get('/', function(req, res) {
	res.sendFile('./client/build/index.html', { root: __dirname });
 });

app.get('/BidItems', async (req, res) => {
	const item = await BidItem.find();
	res.json(item);
});

app.get('/Bidders', async (req, res) => {
	const bidders = await Bidder.find();
	res.json(bidders);
});

app.post('/BidItems/new', (req, res) => {
	const item = new BidItem({
		itemName: req.body.itemName,
		currentBid: req.body.currentBid,
		img: req.body.img,
		itemDescription: req.body.itemDescription
	})

	item.save();

	res.json(item);
});

app.post('/Bidder/new', (req, res) => {
	const item = new Bidder({
		name: req.body.name,
		bidAmount: req.body.bidAmount,
		bidItem: req.body.bidItem,
	})

	item.save();

	res.json(item);
});

app.put('/BidItems/update/:id', async (req, res) => {
	const bidAmount = await BidItem.findById(req.params.id);
	bidAmount.currentBid = req.body.currentBid;
	bidAmount.save();
	res.json(bidAmount);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});

app.get('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;

	todo.save();

	res.json(todo);
})

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build/"))

	app.get("*", (res, req) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
	})
}

app.listen(process.env.PORT || 3001);
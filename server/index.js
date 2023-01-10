const express = require('express');
const cors = require('cors');
const connectDb = require('./config/db');
const Item = require('./model/Item');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

connectDb();

// Routes

app.get('/', (req, res) => {
    res.send("items is in progress please wait");
})

app.get('/todos', async(req, res) => {
    const items = await Item.find({});

    res.json(items);
});

app.post('/todos/new', (req, res) => {
    const {title, text, timestamp, completed} = req.body;
    const item = new Item({title, text, timestamp, completed})
    item.save();

    res.json(item);
});

app.delete('/todos/delete/:id', async(req, res) => {
    const deletedItemd = await Item.findByIdAndDelete(req.params.id)

    res.json(deletedItemd)
});

app.put('/todos/update/:id', async(req, res) => {
    const item = await Item.findById(req.params.id);

    item.completed = !item.completed;

    item.save();

    res.json(item);
})

app.listen(port, () => {
    console.log(`Server start on port ${port}`);
})
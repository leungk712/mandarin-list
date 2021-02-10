const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.options('*', cors());

const postsRouter = require('./routes/api/posts');

app.use('/posts', postsRouter);

app.get("/", (req, res) => {
    res.send("Hello to mandarin API");
});

app.use(express.static('../client/dist'));

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '../client/dist/index.html'));
});

const uri = process.env.ATLAS_URI;
const connectDB = async() => {
    await mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => { 
        mongoose.set('bufferCommands', false);
    })
    .catch((err) => handleError(err));
}

connectDB().then(() => console.log("we did it, we're connected!"));

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established securely");
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server started on ${port}`);
});

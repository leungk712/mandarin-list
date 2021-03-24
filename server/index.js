const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan(':method :url :status :response-time ms'));
app.options('*', cors());

// Router
const categoriesRouter = require('./routes/api/categories');
const postsRouter = require('./routes/api/posts');
const storiesRouter = require('./routes/api/stories');
const usersRouter = require('./routes/api/users');

app.use('/categories', categoriesRouter);
app.use('/posts', postsRouter);
app.use('/stories', storiesRouter);
app.use('/users', usersRouter);

app.use(express.static('../client/dist'));

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '../client/dist/index.html'));
});

// MongoDB Connection
const uriDev = process.env.ATLAS_URI;
const uriProd = process.env.ATLAS_URI_PRODUCTION;
const db = process.env.NODE_ENV === 'production' ? uriProd : uriDev;
const connectDB = async() => {
    await mongoose.connect(uriDev, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        bufferCommands: false, 
        bufferMaxEntries: 0 
    })
    .then(() => {
        
        console.log("we are connected now"); 
    })
    .catch((err) => handleError(err));
}

connectDB();

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established securely");
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

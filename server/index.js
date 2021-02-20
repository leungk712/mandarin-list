const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
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

// Passport Config
require('./config/passport')(passport);

// Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Connect Flash
app.use(flash());

// Router
const postsRouter = require('./routes/api/posts');
const usersRouter = require('./routes/api/users');

app.use('/posts', postsRouter);
app.use('/users', usersRouter);

app.use(express.static('../client/dist'));

app.get('/', function (req, res) {
    res.render(path.join(__dirname + '../client/dist/index.html'));
});

// MongoDB Connection
const uri = process.env.ATLAS_URI;
const connectDB = async() => {
    await mongoose.connect(uri, { 
        useNewUrlParser: true, 
        useCreateIndex: true, 
        useUnifiedTopology: true, 
        bufferCommands: false, 
        bufferMaxEntries: 0 
    })
    .then(() => { console.log("we are connected now"); })
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

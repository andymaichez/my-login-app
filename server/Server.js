// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/Auth');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
// const adjustmentRoutes = require('./routes/Adjustment');

// Initialization
const app = express();
const PORT = process.env.PORT || 5000;

// Database
mongoose.connect('mongodb+srv://Waweru:ogogo@salestracker.tzqaq2d.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(bodyParser.json()); // For parsing application/json

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Replace with your frontend URL
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  credentials: true, // Allow credentials (cookies) to be sent
};

app.use(cors(corsOptions)); 

// Preflight Requests
app.options('/api/auth/login', cors(corsOptions)); // Handle preflight requests


// Session setup
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://Waweru:ogogo@salestracker.tzqaq2d.mongodb.net/' }),
  cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// Auth Routes
app.use('/api/auth', authRoutes);

// Increase the limit to 10mb (adjust as needed)
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));


app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

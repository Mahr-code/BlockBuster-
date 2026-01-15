const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

// Import mock data for testing
const mockData = require('./mockData');

// Import routes
const authRoutes = require('./routes/auth');
const postsRoutes = require('./routes/posts');
const threadsRoutes = require('./routes/threads');
const jobsRoutes = require('./routes/jobs');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Serve static files
app.use(express.static(path.join(__dirname, '/')));

// MongoDB Connection - commented out for testing
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/blockbuster', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.error('MongoDB connection error:', err));

// Using in-memory mock data for testing
console.log('Using in-memory data for testing');
mockData.initMockData();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/threads', threadsRoutes);
app.use('/api/jobs', jobsRoutes);

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/threads', (req, res) => {
  res.sendFile(path.join(__dirname, 'threads.html'));
});

app.get('/jobs', (req, res) => {
  res.sendFile(path.join(__dirname, 'jobs.html'));
});

app.get('/submit', (req, res) => {
  res.sendFile(path.join(__dirname, 'submit.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
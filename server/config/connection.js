const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ponchobt:diegoangel@cluster0.ssmefhs.mongodb.net/googlebooks?retryWrites=true&w=majority')
  .then(() => {
    console.log('🌍 Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

const db = mongoose.connection;

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('MongoDB connection successful');
});

module.exports = db;
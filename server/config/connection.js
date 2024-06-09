const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://ponchobt:diegoangel@cluster0.ssmefhs.mongodb.net/googlebooks');

module.exports = mongoose.connection;

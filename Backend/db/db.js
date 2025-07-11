const mongoose = require('mongoose');


function connectToDb() {
  mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(() => {
    console.log("✅ MongoDB connected");
  }).catch(err => {
    console.error("❌ MongoDB connection error:", err.message);
  });
}

module.exports = connectToDb; 

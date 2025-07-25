const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser')
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes')
const captainRoutes = require('./routes/captain.routes')
const mapsRoutes = require('./routes/maps.routes')
const rideRoutes = require('./routes/ride.routes')

connectToDb();

app.use(cors({
  origin: 'https://frontend-9uq5.onrender.com',
  credentials: true
}));
app.use(express.json())
app.use(express.urlencoded({extended: true})); 
app.use(cookieParser())

app.get('/', (req,res)=>{
    res.send('Hello Sumit');
})

app.use('/users', userRoutes);

app.use('/captain', captainRoutes)

app.use('/maps', mapsRoutes)

app.use('/rides', rideRoutes)

module.exports = app;

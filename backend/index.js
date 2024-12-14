const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/authRoutes');
const locationRoutes = require('./src/routes/locationRoutes');
const adminRoutes = require('./src/routes/adminRoutes');
const cors=require("cors")

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());
mongoose.connect('mongodb://127.0.0.1:27017/location_logs');

app.use('/auth', authRoutes);
app.use('/location', locationRoutes);
app.use('/admin', adminRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

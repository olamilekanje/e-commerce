const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const helmet = require('helmet');
const orderRoutes = require('./routes/orderRoutes');
const path = require("path");

require('dotenv').config();
require('express-async-errors');

const app = express();

if(!process.env.JWT_SECRET){
    console.log("Invalid JWT Secret provided");
}

//app.use(helmet());
app.use(bodyParser.json());

// Serve static files from the 'client' directory
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);


connectDB();

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const voteRoutes = require('./routes/voteRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(`MongoDB connection error: ${err}`));

app.use('/api/users', userRoutes);
app.use('/api/votes', voteRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

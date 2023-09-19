const express = require('express');
const dotenv = require('dotenv');
const { chats } = require('./data/data')
const connectDB = require('./config/db')
const colors = require('colors')
const userRoutes = require('./routes/userRoutes')
const { errorHandler, notFound } = require('./middleware/errorMiddleware');


const app = express();
dotenv.config();
connectDB();

app.use(express.json()) // to accept JSON data

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/user', userRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 8000

// app.listen(PORT);
app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`.yellow.bold))

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const UserRouter = require('./routes/userRoutes');
const connectDb = require('./db/connectDb');
const cors = require('cors');
const BlogRouter = require('./routes/blogRoutes')

app.use(cors(
    {
        origin: '*',
        credentials: true,
    }
));
dotenv.config();
connectDb();

app.use(express.json());
app.get('/', (req, res) => {
    res.json({ message: 'API is working' });
})
app.use('/api/user', UserRouter);
app.use('/api/blog', BlogRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
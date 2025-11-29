require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');


const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');


const app = express();
app.use(helmet());
app.use(express.json());
app.use(cors({ origin: true }));
app.use(rateLimit({ windowMs: 1 * 60 * 1000, max: 100 })); // basic rate limit


app.use('/auth', authRoutes);
app.use('/users', userRoutes);


app.use((err, req, res, next) => {
console.error(err);
res.status(500).json({ error: 'Internal server error' });
});


const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server running on port ${port}`));


module.exports = app; // exported for testing
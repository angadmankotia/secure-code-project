const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../db');
const validate = require('../middleware/validate');
const { sanitize } = require('../utils/sanitize');


const router = express.Router();


const registerSchema = require('joi').object({
username: require('joi').string().alphanum().min(3).max(30).required(),
password: require('joi').string().min(8).required()
});


const loginSchema = require('joi').object({
username: require('joi').string().required(),
password: require('joi').string().required()
});


router.post('/register', validate(registerSchema), async (req, res) => {
try {
const { username, password } = sanitize(req.validated);
const hashed = await bcrypt.hash(password, 12);
const result = await db.query(
'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING id, username, role',
[username, hashed]
);
res.status(201).json(result.rows[0]);
} catch (err) {
if (err.code === '23505') return res.status(409).json({ error: 'Username taken' });
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


router.post('/login', validate(loginSchema), async (req, res) => {
try {
const { username, password } = sanitize(req.validated);
const { rows } = await db.query('SELECT id, username, password_hash, role FROM users WHERE username=$1', [username]);
if (rows.length === 0) return res.status(401).json({ error: 'Invalid credentials' });
const user = rows[0];
const ok = await bcrypt.compare(password, user.password_hash);
if (!ok) return res.status(401).json({ error: 'Invalid credentials' });
const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET, { expiresIn: '2h' });
res.json({ token });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;
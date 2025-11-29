const express = require('express');
const db = require('../db');
const { authenticate, authorize } = require('../middleware/auth');
const { sanitize } = require('../utils/sanitize');


const router = express.Router();


// Example: admin only list users
router.get('/', authenticate, authorize(['admin']), async (req, res) => {
try {
const { rows } = await db.query('SELECT id, username, role, created_at FROM users ORDER BY id');
res.json(rows.map(r => ({ ...r }))); // no raw HTML in responses
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


// Example: get user by id - owner or admin
router.get('/:id', authenticate, async (req, res) => {
try {
const id = parseInt(req.params.id, 10);
if (Number.isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
const { rows } = await db.query('SELECT id, username, role, created_at FROM users WHERE id=$1', [id]);
if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
const user = rows[0];
if (req.user.id !== user.id && req.user.role !== 'admin') return res.status(403).json({ error: 'Forbidden' });
res.json(user);
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


module.exports = router;
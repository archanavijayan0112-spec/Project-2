const express = require('express');
const router = express.Router();

// Mock database (we'll replace with MongoDB later)
let expenses = [];

// GET all expenses
router.get('/expenses', (req, res) => {
  res.json(expenses);
});

// ADD new expense
router.post('/expenses', (req, res) => {
  const { amount, description } = req.body;
  
  if (!amount || !description) {
    return res.status(400).json({ error: 'Amount and description required' });
  }
  
  const newExpense = {
    id: Date.now(),
    amount,
    description,
    date: new Date()
  };
  
  expenses.push(newExpense);
  res.json(newExpense);
});

// DELETE expense
router.delete('/expenses/:id', (req, res) => {
  const { id } = req.params;
  expenses = expenses.filter(e => e.id !== parseInt(id));
  res.json({ message: 'Expense deleted' });
});

module.exports = router;
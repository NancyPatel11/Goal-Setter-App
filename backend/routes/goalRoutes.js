const express = require('express')
const router = express.Router()
const {getGoals, setGoal, updateGoal, deleteGoal} = require('../controllers/goalController')
const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, setGoal)
router.route('/:id').put(protect, updateGoal).delete(protect, deleteGoal)

/*
// Read
router.get('/', getGoals)

// Create
router.post('/', setGoal)

// Update
router.put('/:id', updateGoal)

// Delete
router.delete('/:id', deleteGoal)
*/

module.exports = router
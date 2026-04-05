import express from 'express'
import { createReview, getReviews } from '../Controllers/reviewController.js'
import { verifyUser } from '../utils/verifyToken.js'

const router = express.Router()

// Create new review
router.post('/:tourId', verifyUser, createReview)

// Get reviews for a tour
router.get('/:tourId', getReviews)

export default router
import Tour from "../models/Tour.js"
import Review from "../models/Review.js"

export const createReview = async (req, res) => {
   try {
      const tourId = req.params.tourId
      const { username, reviewText, rating } = req.body

      // Validate required fields
      if (!username || !reviewText || !rating) {
         return res.status(400).json({
            success: false,
            message: "Please provide username, review text and rating"
         })
      }

      // Create new review
      const newReview = new Review({
         username,
         reviewText,
         rating,
         tour: tourId
      })

      // Save the review
      const savedReview = await newReview.save()

      // Update the tour's reviews array
      await Tour.findByIdAndUpdate(tourId, {
         $push: { reviews: savedReview._id }
      })

      res.status(200).json({
         success: true,
         message: "Review submitted successfully",
         data: savedReview
      })
   } catch (error) {
      console.error("Review creation error:", error)
      res.status(500).json({
         success: false,
         message: error.message || "Failed to submit review"
      })
   }
}

// Get reviews for a tour
export const getReviews = async (req, res) => {
   try {
      const tourId = req.params.tourId
      const reviews = await Review.find({ tour: tourId })

      res.status(200).json({
         success: true,
         message: "Successfully fetched reviews",
         data: reviews
      })
   } catch (error) {
      res.status(404).json({
         success: false,
         message: error.message
      })
   }
}
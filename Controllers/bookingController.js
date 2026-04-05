import Booking from './../models/Booking.js'


// create new booking
export const createBooking = async(req,res) => {
   try {
      // Validate required fields
      const { fullName, phone, guestSize, bookAt } = req.body
      if (!fullName || !phone || !guestSize || !bookAt) {
         return res.status(400).json({
            success: false,
            message: "Please fill in all required fields"
         })
      }

      const newBooking = new Booking(req.body)
      const savedBooking = await newBooking.save()

      res.status(200).json({
         success: true, 
         message: "Your tour is booked!", 
         data: savedBooking
      })
   } catch (error) {
      console.error("Booking error:", error)
      res.status(500).json({
         success: false, 
         message: error.message || "Internal server error!"
      })
   }
}

// get single booking
export const getBooking = async(req,res) => {
   const id = req.params.id
   
   try {
      const book = await Booking.findById(id)

      if (!book) {
         return res.status(404).json({
            success: false,
            message: "Booking not found"
         })
      }

      res.status(200).json({
         success: true,
         message: "Successful!",
         data: book
      })
   } catch (error) {
      res.status(404).json({
         success: false,
         message: "Not Found!"
      })
   }
} 


// get all booking
export const getAllBooking = async(req,res) => {
   
   try {
      const books = await Booking.find()

      res.status(200).json({
         success: true,
         message: "Successful!",
         data: books
      })
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal server error!"
      })
   }
} 
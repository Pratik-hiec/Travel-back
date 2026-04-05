import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "Tour",
    },
    username: {
      type: String,
      required: true,
    },
    reviewText: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
      default: 0,
    },
    createdDate: {
      type: String,
      required: true
    },
    createdTime: {
      type: String,
      required: true
    }
  }
);

// Pre-save middleware to format date and time
reviewSchema.pre('save', function(next) {
  if (!this.createdDate || !this.createdTime) {
    const date = new Date();
    
    // Format date as "DD-M-YYYY"
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    this.createdDate = `${day}-${month}-${year}`;
    
    // Format time as "HH:MM AM/PM"
    this.createdTime = date.toLocaleString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  }
  next();
});

export default mongoose.model("Review", reviewSchema);

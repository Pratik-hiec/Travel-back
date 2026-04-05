import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    city: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    distance: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxGroupSize: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['cultural', 'adventure', 'historical', 'beach', 'mountain']
    },
    reviews: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Review",
      },
    ],
    featured: {
      type: Boolean,
      default: false,
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
tourSchema.pre('save', function(next) {
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

export default mongoose.model("Tour", tourSchema);

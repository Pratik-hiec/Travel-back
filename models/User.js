import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },

    photo: {
      type: String,
    },

    role: {
      type: String,
      default: "user",
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
userSchema.pre('save', function(next) {
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

export default mongoose.model("User", userSchema);

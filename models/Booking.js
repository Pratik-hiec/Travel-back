import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
   {
      userId: {
         type: String
      },
      userEmail: {
         type: String
      },
      tourName: {
         type: String,
         required: true,
      },
      fullName: {
         type: String,
         required: true,
      },
      guestSize: {
         type: Number,
         required: true
      },
      phone: {
         type: Number,
         required: true
      },
      bookAt: {
         type: Date,
         required: true
      },
      bookDate: {
         type: String,
         required: true
      },
      bookTime: {
         type: String,
         required: true
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
bookingSchema.pre('save', function(next) {
   // Format booking date and time
   if (!this.bookDate || !this.bookTime) {
      const bookingDate = new Date(this.bookAt);
      
      // Format date as "DD-M-YYYY"
      const bookDay = bookingDate.getDate();
      const bookMonth = bookingDate.getMonth() + 1;
      const bookYear = bookingDate.getFullYear();
      this.bookDate = `${bookDay}-${bookMonth}-${bookYear}`;
      
      // Format time as "HH:MM AM/PM"
      this.bookTime = bookingDate.toLocaleString('en-US', { 
         hour: '2-digit', 
         minute: '2-digit',
         hour12: true 
      });
   }

   // Format creation date and time
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

export default mongoose.model("Booking", bookingSchema);

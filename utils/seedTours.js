import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Tour from '../models/Tour.js';
import { tours } from '../data/tours.js';

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const seedTours = async () => {
    try {
        // Delete existing tours
        await Tour.deleteMany({});
        console.log('Deleted existing tours');

        // Add createdDate and createdTime to each tour and handle duplicates
        const currentDate = new Date();
        const titleCounts = {};
        const formattedTours = tours.map(tour => {
            // Handle duplicate titles
            if (titleCounts[tour.title]) {
                titleCounts[tour.title]++;
                tour.title = `${tour.title} (${titleCounts[tour.title]})`;
            } else {
                titleCounts[tour.title] = 1;
            }

            return {
                ...tour,
                createdDate: `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`,
                createdTime: currentDate.toLocaleString('en-US', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                })
            };
        });

        // Insert new tours
        await Tour.insertMany(formattedTours);
        console.log('Successfully seeded tours data');

        process.exit();
    } catch (error) {
        console.error('Error seeding tours:', error);
        process.exit(1);
    }
};

seedTours(); 
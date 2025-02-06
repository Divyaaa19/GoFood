const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://divyavani192006:divya19@cluster0.kje0w.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to MongoDB");
        // Fetch the collection
        const db = mongoose.connection.db;
        const fetched_data = db.collection("food_items");
        // Use async/await to handle the query
        const data = await fetched_data.find({}).toArray();  // Use async/await to fetch data
        if (data.length === 0) {
            console.log("No data found in 'food_items' collection");
        } else {
            global.food_items = data;
        }
        const fetched_data1 = db.collection("foodCategory");
        // Use async/await to handle the query
        const catData = await fetched_data1.find({}).toArray();  // Use async/await to fetch data
        if (data.length === 0) {
            console.log("No data found in 'foodCategory' collection");
        } else {
            global.foodCategory = catData;
        }



    } catch (err) {
        console.error("Error:", err);
    }
};

module.exports = mongoDB;

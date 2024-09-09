
const mongoose = require("mongoose");
const mongouri = "mongodb+srv://gofood:akshay1234@cluster0.ufqdpfs.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0";
const mongoDB = async () => {
    await mongoose.connect(mongouri, { useNewUrlParser: true }).then(async () => {
        console.log("Connected with database");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        // console.log(fetched_data);
        try {
            const data = await fetched_data.find({}).toArray();
            const foodCategory=await mongoose.connection.db.collection("foodCategory");
            try{
                const categoryData=await foodCategory.find({}).toArray();
                global.foodCategory=categoryData;
                
            }catch(err){
                console.log("Error in Category.find()");
            }
            global.food_items = data;
            // console.log(global.food_items);
          } catch (err) {
            console.log("Error in Food_items.find().toArray():", err);
          }
    }).catch((err)=>{console.log(err);})
}
module.exports = mongoDB;
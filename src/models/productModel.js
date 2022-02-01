const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define Product Document Structure
const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: Number,
    unit_in_stock: Number,
    // reviews field is an array field
    reviews: [{
        star: Number,
        comment: String
    }]
},
{ 
    timestamps: true        // for storing time/date of creation
});

// export Product Schema to be usable in other components
module.exports = mongoose.model("Product", productSchema);
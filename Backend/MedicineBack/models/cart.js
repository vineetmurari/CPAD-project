const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
{
    item_id:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        unique: true
    },
    qty:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        unique: true
    },

    price:{
        type: String,
        required: true,
        maxlength: 10,
        trim: true,
        unique: true 
    }
}
)

module.exports = mongoose.model("Cart", cartSchema);
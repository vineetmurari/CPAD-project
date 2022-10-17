const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
{
    email:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
    },
    item_name:{
        type: String,
        maxlength: 32,
        trim: true
    },
    qty:{
        type: String,
        maxlength: 32,
        trim: true
    },

    price:{
        type: String,
        maxlength: 10,
        trim: true,
    },
    orderd:{
        type: Boolean
    }
}
)

module.exports = mongoose.model("Cart", cartSchema);
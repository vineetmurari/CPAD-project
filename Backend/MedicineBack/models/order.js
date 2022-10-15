const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
{
    item_id:{
        type: String,
        maxlength: 32,
        trim: true,
       
    },
    qty:{
        type: String,
        maxlength: 32,
        trim: true,
        
    },

    price:{
        type: String,
        maxlength: 10,
        trim: true,
         
    }
}
)

const ordersSchema = new mongoose.Schema(
    {
       
       orderid:{
        type: String,
        required: true,
        maxlength: 32,
        trim: true,
        unique: true
       }, 
        email: {
          type: String,
          required: true,
          maxlength: 32,
          trim: true
        },
        items: [itemsSchema],
        payment :{
            type: Boolean,
            required: true
        }

    }

 )

 module.exports = mongoose.model("Orders", ordersSchema);
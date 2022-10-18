const mongoose = require("mongoose");


 const medicineSchema = new mongoose.Schema(
    {
        mid: {
          type: String,
          required: true,
          maxlength: 32,
          trim: true,
          unique: true
        },
        medicine: {
          type: String,
          required: true,
          maxlength: 32,
          trim: true
        },
        prescription:{
            type: Boolean,
            required: true
        },
        price:{
          type: String,
          required: true,
          maxlength: 10,
          trim: true,
          unique: true 
        },
        stock:{
          type: Boolean
        }

    }

 )

 module.exports = mongoose.model("Medicine", medicineSchema);
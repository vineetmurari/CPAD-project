const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
    {
       
       email:{
        type: String
       }, 
       item_name: {
          type: String
        },
        upload_status :{
            type: Boolean
        }

    }

 )

 module.exports = mongoose.model("Prescription", prescriptionSchema);
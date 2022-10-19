var mongoose = require('mongoose');

    var prescriptionSchema = new mongoose.Schema({
        name: String,
        desc: String,
        img:
        {
            data: Buffer,
            contentType: String
        }
    });
      
      
    module.exports = new mongoose.model('Prescription', prescriptionSchema); 
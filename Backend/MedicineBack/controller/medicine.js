const Medicine = require('../models/medicine')


exports.getmedicines =(req, res, next)=>{
    Medicine.find({}, function (err, result) {
        if (err){
            console.log(err)
            return res.json({error: err})
        } 
        else{
          return   res.json(result)
        }
      })
}
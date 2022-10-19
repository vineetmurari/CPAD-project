const Prescription = require('../models/prescription');

exports.poststatus = async (req, res, next)=>{

    
    let status = await  Prescription.find({email: req.params.id,item_name: req.params.name})

    if(!status){
    const status = new Prescription(req.body)

    status.save((err, status)=>{
        if(err){
            console.log(err)
            return res.status(400).json(
                {
                    error: "Unable to add user"
                }
            )
        }

        res.json({
            message: "success",
            status
        })
    })
    }
    else{
        res.json({"msg": "collection exists"})
    }


}    


exports.updatestatus = async (req, res, next)=>{

    let status = await Prescription.find({email: req.params.id})

    if(!status){
        return res.json({
            message: "failed to find the Status item"
        })
    }
    else{
        let updated = await Prescription.findOneAndUpdate(
            {email:req.params.id}, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );

        res.json({
            updated
        });

    }

}

exports.getstatus=  async (req, res, next)=>{

    let status = await  Prescription.find({email: req.params.id,item_name: req.params.name})

    if(!status){
        return res.json({
            message: "failed to find the cart item"
        })
    }
    else{
        return res.json({status})
    }

}
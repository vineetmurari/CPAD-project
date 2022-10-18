const Orders = require('../models/order')


exports.postorders =(req, res, next)=>{
  const order = new Orders(req.body)

  order.save((err, user)=>{
        if(err){
            console.log(err)
            return res.status(400).json(
                {
                    error: "Unable to create order"
                }
            )
        }

        res.json({
            message: "success",
            order
        })
    })
}

exports.getorder = (req, res, next) => {
   const query  = Orders.where({ email: req.params.id });
    query.find(function (err, Order) {
        if (err) {
            console.log(err)
            return res.json({message:'no transactions to show'})
        }
        if (Order) {
                res.json(Order)
            }
            
}).limit(3).sort({_id: "descending"});
}
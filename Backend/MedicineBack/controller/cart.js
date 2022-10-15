const Cart = require('../models/cart')

exports.addtocart =(req, res, next)=>{
    const cart = new Cart(req.body)
  
    cart.save((err, user)=>{
          if(err){
              console.log(err)
              return res.status(400).json(
                  {
                      error: "Unable to add to cart"
                  }
              )
          }
  
          res.json({
              message: "success",
              cart
          })
      })
  }
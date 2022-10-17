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


  exports.getcartitems = (req, res, next) =>{
    const query  = Cart.where({ email: req.params.id });
    query.find( function (err, result) {
        if (err){
            console.log(err)
            return res.json({error: err})
        } 
        else{
          return   res.json(result)
        }
      })
  }

 exports.updateOrdered = async (req, res, next)=>{

    let cart = await Cart.findById(req.params.id)

    if(!cart){
        return res.json({
            message: "failed to find the cart item"
        })
    }
    else{
        let update_ordered = await Cart.findByIdAndUpdate(
            req.params.id, req.body, {
                new: true,
                runValidators: true,
                useFindAndModify: false
            }
        );

        res.json({
            update_ordered
        });

    }

  }


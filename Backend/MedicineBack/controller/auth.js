const jwt = require('jsonwebtoken')

exports.auth = (req, res, next)=>{

    const bearrerHeadrer = req.headers['authorization']
  
    if(typeof bearrerHeadrer !== 'undefined'){
        const bearrer = bearrerHeadrer.split(' ');
        const bearrerToken =bearrer[1];
        req.token=bearrerToken
        next();
    }
  
    else{
     return   res.status(403).json({
            "message": "User is not authorized to access this resource"
        });
    }
  
  }
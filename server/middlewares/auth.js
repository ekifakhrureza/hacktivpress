const jwt = require('jsonwebtoken')

module.exports = {
    auth:(req,res,next) => {
      try { 
        token = req.headers.token
        const decoded = jwt.verify(token, process.env.SECRETKEY);
        req.decoded = decoded
        next();
      } catch(err) {
        res.status(400).json({
          message: "Bad Authentication"
        });
      }
    }
  
  };



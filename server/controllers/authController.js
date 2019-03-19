const User = require("../models/User");

exports.validateSignup = (req,res,next) => {
   req.sanitizeBody("name")
   req.sanitizeBody("email")
   req.sanitizeBody("password")
   // name non null
   req.checkBody("name" , "Enter a name")
      .notEmpty();
   req.checkBody("name" , "Name must between 4 to 10 character")
      .isLength({min: 4, max: 10});
   // email 
   req.checkBody("email" , "Enter a email")
      .isEmail()
      .normalizeEmail()
   // password
   req.checkBody("password" , "Enter a password")
      .notEmpty()
   req.checkBody("password" , "Password must between 4 to 15 character")
      .isLength({min: 4, max: 15});  
      
   const errors = req.validationErrors();
   if(errors){
      const err = errors.map(err => err.msg);
      return res.status(400).send(err);
   }
   next();
}

exports.signup = async (req,res) => {
   const { name,email,password } = req.body;
   const user = await new User({name,email,password})
   await User.register(user, password, function(err,user){
      if(err){
         return res.status(500).send(err.message)
      }
      res.json(user)
   })
}
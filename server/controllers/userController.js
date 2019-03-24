const User = require("../models/User");
   mongoose= require("mongoose")

exports.getUser = async (req,res) => {
   const user = await User.find({}).select("_id name email createdAt updatedAt");
   res.json(user)
}

exports.getUserById = async (req,res,next,id) => {
   const user = await User.findOne({_id: id});
   if(user){
      req.profile = user;
      const profileId = mongoose.Types.ObjectId(req.profile._id);
      if(profileId.equals(req.user._id)){
         req.isAuthUser = true;
         return next();
      }
      next()
   }else{
      res.status(404).json({message: "User not found"})
   }
}

exports.deleteUser = async (req,res) => {
   const { userId } = req.params;
   if(!req.isAuthUser){
      res.status(400).json({message: "You are not authorized"})
   }else{
      const deleteUser = await User.findOneAndDelete({_id: userId})
      res.json(deleteUser);
   }
}

exports.checkAuth = async (req,res,next) => {
   if(req.isAuthenticated()){
      return next()
   }
   res.redirect("/signin")
}

exports.getUserCurrent = async (req,res) => {
   if(!req.isAuthUser){
      res.status(403).json({message: "Please signin to action"})
      res.redirect("/signin")
   }
   const user = await req.user;
   res.json(user)
}

exports.getUserProfile = (req,res) => {
   if(req.profile){
      res.json(req.profile)
   }
}
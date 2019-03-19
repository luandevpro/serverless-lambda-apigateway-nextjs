const mongoose       = require("mongoose")
const { ObjectId }   = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")
const mongodbErrorHandler = require("mongoose-mongodb-errors")

const userSchema = new mongoose.Schema({
   email: {
      type: String,
      required: "Email is required",
      unique: true
   },
   name: {
      type: String,
      required: "Name is required",
      minlength: 4,
      maxlength: 10,
      unique: true
   },
   avatar: {
      type: String,
      default: "/static/images/profile-image.png"
   },
   about: String,
   following: [{type: ObjectId,ref: "user"}],
   followers: [{type: ObjectId,ref: "user"}],
},
   // auto createAt vs updateAt field
   {timestamps: true}
)


const autoPopulateFollowingAndFollowers = function(next){
   this.populate("following" , "_id name user");
   this.populate("followers" , "_id name user");
   next();
}

userSchema.pre("findOne" , autoPopulateFollowingAndFollowers)

userSchema.plugin(passportLocalMongoose, { usernameField: "email" });
userSchema.plugin(mongodbErrorHandler);

module.exports = User = mongoose.model("user", userSchema)
const mongoose       = requier("mongoose")
const { ObjectId }   = mongoose.Schema
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
   email: String,
   name: String,
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

module.exports = mongoose.model("user", userSchema)
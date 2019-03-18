const mongoose       = requier("mongoose")
const { ObjectId }   = mongoose.Schema
      
const postSchema = new mongoose.Schema({
   text: String,
   image: String,
   likes: [{type: ObjectId, ref: "user"}],
   comments: [
      {
         text: String,
         createAt: {type: Date,default: Date.now},
         postedBy: {type: ObjectId, ref: "user"}
      }
   ],
   postedBy: {type: ObjectId,ref: "user"},
   createAt: {
      type: Date,
      default: Date.now
   }
})

const autoPopulatePostedBy = function(next){
   this.populate("postedBy" , "_id name avatar");
   this.populate("comments.postedBy" , "_id name avatar");
   next();
}

postSchema
   .pre("findOne" , autoPopulatePostedBy)
   .pre("find" , autoPopulatePostedBy)

postSchema.index({ postedBy: 1, createdAt: 1 });

module.exports = mongoose.model("post",postSchema)
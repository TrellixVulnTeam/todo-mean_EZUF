const mongoose = require("mongoose");
// const {DB_LINK} = require("./secret");
mongoose.connect(process.env.MONGODB_ATLAS_URL).then(()=>{
  console.log("Db connected");
}).catch((e)=>{
  console.log(e.message);
})
const taskSchema = mongoose.Schema({
  title:{
    type:String,
    require:true
  },
  description:{
    type:String,
    default:"no description"
  },
  imagePath:{type:String},
  creator:{type:mongoose.Schema.Types.ObjectId,ref:"User",required:true}
  // _id:String
});

module.exports = mongoose.model('task',taskSchema);

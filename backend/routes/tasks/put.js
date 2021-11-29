const Task = require("../../Models/Task");
module.exports={
  updateTask:(req,res,next) => {
    // const id = req.params.id;
    const url = req.protocol +'://'+req.get("host");
    let imagePath= req.body.imagePath;
    if(req.file){
      imagePath = url+'/images/'+req.file.filename
    }
    const task = new Task({
      _id:req.body._id,
      title:req.body.title,
      description:req.body.description,
      imagePath :imagePath,
    });
    console.log(task)
    Task.updateOne({_id:req.body._id,creator:req.userData.userId},task).then((result)=>{

    console.log(result)
      if(result){
        res.status(201).json({
          status:{
            code:201,
            message:"successful",
          },
          data:task
        })
      }else{
        res.status(401).json({
          status:{
            code:401,
            message:"auth failed",
          }

        })
      }

    }).catch(err=>{
      res.status(500).json({
        status:{
          message:"unautherized",
          code:500,
        }
      })
    })
  }
}

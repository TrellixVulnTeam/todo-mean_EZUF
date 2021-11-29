const Task = require("../../Models/Task");
module.exports={
  createTask:(req,res,next)=>{
    console.log(req.userData);
    const url = req.protocol +'://'+req.get("host");
    let {title,description} = req.body;

    const task = new Task({
      title,
      description,
      imagePath :url+'/images/'+req.file.filename,
      creator:req.userData.userId,

    });
    task.save();
    console.log(task);
    res.json({
      status:{
        code:201,
        message:"successful",
      },
      data:task
    })
  }
}

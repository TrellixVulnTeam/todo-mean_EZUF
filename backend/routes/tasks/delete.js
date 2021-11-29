const Task = require("../../Models/Task");
module.exports = {
  deleteTask:(req,res,next) => {
    const id = req.params.id;
    console.log(req.params.id);

      Task.deleteOne({_id:id,creator:req.userData.userId}).then((result)=>{

        console.log(result)
          if(result.deletedCount > 0){
            res.status(201).json({
              status:{
                code:201,
                message:"successful",
              }
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
        console.log("err",err);
        res.status(500).json({
          status:{
            message:"unautherized",
            code:500,
          }
        })
      })

  }

}

const Task = require("../../Models/Task");

module.exports={
  getById :(req,res,next)=>{

    Task.findById(req.params.id).then((task)=>{
        res.json({
          status:{
            message:"successful",
            code :200,
          },
          data:task,
        })
    }).catch((err)=>{
      console.log(err.message);
      res.send({
        status:{
          message:err.message,
          code:404
        }
      })
    })
  },
  getAll: (req,res,next)=>{
    console.log(req.params);
    const pageSize = +req.query.pagesize;
    const currentPage= +req.query.currentpage;
    const taskQuery = Task.find();
    if(pageSize&&currentPage >-1){
      taskQuery
        .skip(pageSize*(currentPage))
        .limit(pageSize)
    }
    taskQuery.then(async(taskData)=>{
      res.json({
        status:{
          code :200,
          message:"successful"
        },
        data:taskData,
        totalCount:await Task.count(),
      })
    }).catch(err=>{
      res.json(
          {status:{
            code:401,
            message:err.message
          },
        }
      )
    })
  }

}

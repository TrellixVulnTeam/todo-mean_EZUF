const jwt = require('jsonwebtoken');
module.exports =async (req,res,next) => {
  try {
    const token= req.headers.authorization.split(' ')[1];
    const decodedToken = await jwt.verify(token,process.env.JWT_KEY);
    req.userData = {email:decodedToken.email,userId :decodedToken.userId};
    next();
  }catch(err) {
    res.status({
      status:{
        message:'auth failed',
        code: 401,
      }
    })

  }


}

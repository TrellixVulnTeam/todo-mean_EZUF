const http = require('http');
const port = process.env.port || 3000;
const express = require("express");
const app = express();
const bodyParser= require("body-parser");
const Task = require('./Models/Task');
const path = require('path');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port',port)
app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type, Accept,Authorization"

  );
  res.setHeader("Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );

  next();

})

const task = require('../backend/routes/tasks')
const users = require('../backend/routes/users')
app.use('/api/tasks/',task);
app.use('/api/users/',users);
app.use("/images",express.static(path.join('images')))
const server = http.createServer(app);

server.on('err',(err)=>{
  console.log("error on server " , err.message);
})
server.on('listening',()=>{
  console.log("server is working fine on ", port);
})
server.listen(port)

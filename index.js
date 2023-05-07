const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dbConnection = require('./Config/db')
const port = 5000;

mongoose.Promise = global.Promise


mongoose.connect(dbConnection.url,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(()=>{
  console.log('Connected to database succefully')
})
.catch(err=>{
  console.log('Failed to connect to database ',err)
  process.exit(1)
})

const app = express()
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.use('',require('./Routes/user'))

app.get('',(req,res)=>{
  res.send({message: 'Welcome to my Api'})
})

app.listen(port,(req,res)=>{
  console.log(`Server running on port ${port}`)
})
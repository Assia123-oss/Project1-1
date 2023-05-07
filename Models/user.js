const mongoose = require('mongoose')
const joi = require('joi')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const hashPassword = require('../Utils/hash')


const schema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true
},
email:{
  type:String,
required:true,
},
password:{
type:String,
required:true,
unique:true
}
},{
  
timestamp:true,
})

schema.pre('save',async function(next){
  const salt = await bcrypt.genSalt(8)
  this.password = await bcrypt.hash(this.password,salt)
  next()
  
})


// schema.methods.generateToken = function(){
//   const token = jwt.sign({
//     id:this._id,
//     username:this.username,
//     password:this.password
// },PROCESS.ENV.SECRETKEY,{ExpiresIn:'1d'})
// return token
// }

function validateUser(user){
  const schema = {
username:Joi.String().max(250).min(20).required,
email:Joi.String().max(250).min(20).required,
password:Joi.String().max(200).min(8).required
}
return Joi.validateUser(user,schema)
}

 const user = mongoose.model('Users',schema)

 module.exports = user

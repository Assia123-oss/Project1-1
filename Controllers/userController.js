const UserModel  = require('../Models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { find, create } = require('lodash')

const SignUp = async (req,res)=>{
  // if(!req.body.username && !req.body.email && !req.body.password){
  // res.status(404).send({message: 'Content can not be empty'})
  // }else{
  //   const user = new UserModel({
  //     username:req.body.username,
  //     email:req.body.email, 
  //     password:req.body.password 
  //   })
    

  //   await user.save()
  //   .then(()=>{
  //     res.status(202).send({message: 'User created'})
  //       })
  //     .catch(err=>{
  //       console.log(err)
  //     res.status(404).send({message:"User unable to be created"})
  //     })
  //       }

  // try {
  //   // Create a new user document from the request body
  //   const newUser = new UserModel({
  //     username:req.body.username,
  //     email:req.body.email,
  //     password:req.body.password
  //   })

  //   // Save the new user document to the database
  //   await newUser.save();

  //   // Send a response with the inserted document
  //   res.send(newUser);
  // } catch (err) {
  //   if (err.code === 11000) {
  //     // Handle the duplicate key error
  //     res.status(400).send({ message: 'Username already exists' });
  //   } else {
  //     res.status(500).send({ message: 'Error inserting document' });
  //   }
  // }
  // Handle POST requests to insert new user documents
  let insertSuccess = false;
  let newUser;
  
  while (!insertSuccess) {
    try {
      // Create a new user document from the request body
      newUser = new UserModel({
        username:req.body.username,
        email:req.body.email,
        password:req.body.password
      })

      // Save the new user document to the database
      await newUser.save();

      // Set the insertSuccess flag to true
      insertSuccess = true;

      // Send a response with the inserted document
      res.send(newUser);
    } catch (err) {
      if (err.code === 11000) {
        // Handle the duplicate key error
        console.log(`Username ${newUser.Username} already exists`);
      } else {
        // Handle other errors
        console.error('Error inserting document:', err);
        res.status(500).send({ message: 'Error inserting document' });
        break;
      }
    }
  }


  }

  

  


  const findUsers = async (req,res)=>{
    const user = await UserModel.find()
    
.then((user)=>{
  res.status(202).send(user)
})  
.catch(err=>{
  
res.status(404).send({message: 'Users not found'})
})
}


const findUser = async (req,res)=>{
  const user = await UserModel.findById(req.params.id)
.then((user)=>{
  res.status(202).send(user)
})
.catch(err=>{
  res.status(404).send({message:err.message})
})
}

const Update = async (req,res)=>{ 
const token =  req.Header('Auth')
if(!token) return res.status(404).send({message: 'Please provide a token'})
const user = jwt.verify(token,process.env.secretkey)
if(!req.body) return res.status(404).send({message: 'Data to be updated can not be found'})


const id = req.params.id
await UserModel.findByIdAndUpdate(id,req.body,{UseFindAndModify: false}.then((data)=>{
  if(!data){
    res.status(404).send({message:'User not found'})
  }else{
    user.username = username
    user.email = email
    user.password = password
  }
})
.catch(err=>{
  res.status(404).send({message: err.message})
})

)}


const Delete = async (req,res)=>{
  await UserModel.findOneAndDelete(req.params.id).then(data=>{
    if(!data){
      res.status(404).send({message:'User to delete not found'})
    }else{
      res.status(202).send({message: 'User deleted successfully'})
    }
  })
  .catch(err=>{
    res.status(404).send({message: err.message})
  })
}


const Login = async (req,res)=> {
    try {
      const{email,password} = req.body
      let findUser = await UserModel.findOne({email:email})
      if(!findUser) return res.status(404).send({message: 'Invalid email or password'})
      let checkPassword = await bcrypt.compare(password,findUser.password)
      if(!checkPassword) return res.status(404).send({message: 'Invalid email or password'})
      const token = findUser.giveToken(token)
      res.send(202).send(token)
    } catch (error) {
      console.log(err)
      res.status(500).send({message:'Internal server error'})
    }
}


module.exports = {
  SignUp,
  findUsers,
  findUser,
  Update,
  Delete,
  Login
}
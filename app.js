const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user')
const dotenv = require('dotenv')
dotenv.config();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));

app.get('/',(req,res) => {
  res.render("index");
})

app.post('/create',async (req,res) => {
  let {name, email, image} = req.body;
  let createdUser = await userModel.create({
name,
email,
image
  })
  res.redirect('/read');
})

app.get('/read',async (req,res) => {
  let user = await userModel.find();
  res.render("read",{
    user});
})

app.get('/delete/:id',async (req,res) => {  
  let deletedUser = await userModel.findOneAndDelete({_id: req.params.id});
  res.redirect('/read');
})

app.get('/edit/:userid',async (req,res) => {
  let user = await userModel.findOne({_id: req.params.userid});
  res.render("edit",{user})
});

app.post('/update/:userid',async (req,res) => {
  let {name, email, image} = req.body;
  let updatedUser = await userModel.findOneAndUpdate({_id: req.params.userid},{image, name, email}, {new: true});
  res.redirect('/read');
});

app.listen(3000,() => {
  console.log("Connected to 3000")
})

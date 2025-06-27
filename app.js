const express = require('express');
const path = require('path');
const app = express();
const userModel = require('./models/user')

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
  res.send(createdUser);
})

app.get('/read',async (req,res) => {
  let user = await userModel.find();
  res.render("read",{
    user});
})

app.listen(3000,() => {
  console.log("Connected to 3000")
})
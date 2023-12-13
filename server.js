const express = require('express');
const path=require('path')
const bcrypt = require('bcrypt');
const { error } = require('console');
const app = express();
app.use(express.static('public'));
const saltRounds=10;
let result;
app.use(express.json());
let users = [];
app.get("/", (req, res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
  })

app.post('/register',(req,res)=>
{
    const user=req.body;
    const existinguser = users.find(a=> a.username===user.username);
    if(existinguser)
    {
        
         res.json({message:"Already exists"});
    }
    else
    {
        bcrypt.hash(user.password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                console.log("Error hashing password");
            } else {
                user.password=hash;
                users.push(user);
                console.log(users);
                 res.json({message:"User Created succesfully"});
                
                
            }
        });
        
    }
})
app.post('/login', (req, res) => {
    const abc = req.body;
    const existinguser1 = users.find(a => a.username === abc.username);
    if (existinguser1) {
        bcrypt.compare(abc.password, existinguser1.password, function (err, result) {
            if (result) {
                 res.json({ message: "Logged in Successfully" });
                 
                
            } 
            else {
                
                res.json({message:"Wrong Password"});
            }
        })
    } 
    else {
        res.json({ message: "Invalid User" });
        
    }
});

app.listen(3000, () => {

  });


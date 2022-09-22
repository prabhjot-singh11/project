const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");



let login;
const registration = require("../models/registration")

// LOGIN PAGE

router.get('/',(req,res)=>{
    res.render('login',{data:null})
   });

router.post('/',(req,res)=>{
    console.log(req.body)
const data =  registration.findOne({email:req.body.username},(err,doc)=>{

    //IF USER IS NOT IN THE DATABASE
    if(doc==null){
        res.render('login',{data:false})
    }
    else{

        // CALL THE COMPARE FUNCTION
        let userToken = comparePassword (req.body.password,doc.password)
        console.log(userToken) 
        
        userToken.then(function(result) {
        //    console.log(result)
           if(result==false){
             res.render('login',{data:true})
           }else{
            login = true;

            if(doc.role=="admin"){
                res.redirect('/admin')

            }
            else if(doc.role=="user"){
                res.redirect('/user') 
            }else{
                console.log("login is"+login)
            }
            
            
           }
        })
    }

})
    
    

  //FUNCTION OF COMPARE THE USER PASSWORD AND HASH STRING 
    const comparePassword = async (password, hash) => {
        try {
          
            return await bcrypt.compare(password, hash);
        } catch (error) {
            console.log(error);
        }
    
     
        return false;
    };

})





// registration page 


router.get('/registration',(req,res)=>{
    res.render('ragistration',{data:null})
});

router.post('/registration',(req,res)=>{
   console.log(req.body.name)
    const Password = req.body.pass;
const hash = bcrypt.hashSync(Password, 2);

   const user = new registration({
    firstname:req.body.name,
    lastname:req.body.lastname,
    email:req.body.email,
    password:hash,
    dateofbirth:req.body.dob
   })


   const emial = registration.findOne({email:user.email})
   .then((doc)=>{
       if(doc==null){
        const ne = user.save()
        res.render('ragistration',{data:true})
       }else{
        res.render('ragistration',{data:false})
       }
   })
   .catch((Error)=>{
    res.sendStatus(400)
   })

   console.log(user)
});


module.exports = function myLogger(req, res, next) {
  if(login!=true){
    res.send("you are not logged in please logged in to access this page") 
    console.log("you can not pass")
  }else{
    console.log("you can not pass")
    next()
  }
}







module.exports = router
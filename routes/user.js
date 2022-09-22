const express = require('express');


const  router = express.Router();

router.get('/',(req,res)=>{
    res.render('userindex')
})




module.exports = router
const express = require('express')
const router = express.Router();

const myLogger = require('./login')

router.get('/',(req,res)=>{
    res.render('index')
})




module.exports = router
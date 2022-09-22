const { localsName } = require('ejs')
const mongoose = require('mongoose')


const registration= new mongoose.Schema({

 firstname:{
    type:String,
    required:true
 },
 lastname:{
    type:String,
    require:true
 },
 email:{
    type:String,
    require:true
 },
 password:{
    type:String,
    required:true
 },
 dateofbirth:{
    type:String,
    required:true
 },
 role:{
    type:String,
    default:"user"
 },
 status:{
    type:String,
    default:"inactive"
 }
 


})


module.exports = mongoose.model('registration',registration)
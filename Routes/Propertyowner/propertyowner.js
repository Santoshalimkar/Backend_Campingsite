const express = require("express");
const { body, param, query } = require("express-validator");
const Ownerroutes = express.Router();
const {signupctrl,Loginctrl} =require('../../Controllers/Propertyowner/Propertyowner')




Ownerroutes.post('/Sign-up',signupctrl)
Ownerroutes.post('/Login',Loginctrl)


module.exports = { Ownerroutes };

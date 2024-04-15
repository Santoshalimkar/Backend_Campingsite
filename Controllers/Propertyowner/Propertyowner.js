const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const propertyowner = require("../../Models/Propertyowner/Propertyowner");

const signupctrl = async (req,res) => {
  try {
    const { Name, lastName, email, contactNumber, password } = req.body;
    let existingUser = await propertyowner.findOne({
      $or: [{ email }, { contactNumber }],
    });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email or contact number already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new propertyowner({
      Name,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};



const Loginctrl= async (req,res)=>{
    try {
        const { email, password } = req.body;
    
        // Check if user exists
        const user = await propertyowner.findOne({ email });
        if (!user) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          return res.status(401).json({ message: 'Invalid email or password' });
        }
    
        // Create and send JWT token
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET_KEY, 
          { expiresIn: '1h' } 
        );
    
        res.status(200).json({ token });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}


module.exports = {
	signupctrl,
    Loginctrl
}
// const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/usersModels');
const jwt_secret = process.env.ULTRA_SECRET_KEY;

const verifyUser = async (req, res, next) => {
    const token = req.headers['access_token'];

    console.log("PASO 1");

    if (token) {
      jwt.verify(token, jwt_secret, async (err, decoded) => {
        console.log('PASO 2');
        if(err) {
            console.log(err);
        }

        let data = await User.getUserByEmail(decoded.email);
        console.log(decoded.email);
        if (data.logged == true) {
          req.decoded = decoded;    
          next();   
        } else {
          return res.json({ msg: 'Invalid token' });
        }
      });
    } else {
      res.send({ 
          msg: 'Token not provided' 
      });
    }
 };

module.exports = verifyUser;
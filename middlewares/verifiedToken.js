const User = require("../models/usersModels");
const express = require("express");
const jwt = require("jsonwebtoken");
const jwt_secret = "tortilla";

const protectedRoutes = express.Router();

protectedRoutes.use((req, res, next) => {
    const token = req.cookies['access-token']  

    if (token) {
      jwt.verify(token, jwt_secret, async (err, decoded) => {

        if(decoded == undefined) {
          req.decoded == undefined
          next()
        } else {
          let data = await User.getUserByEmail(decoded.email)
          if (data[0].logged === true) {
            req.decoded = decoded;
            next();   
          } else {
            return res.json({ msg: 'Invalid token' });
          }
        }
      });
    } else {
      req.decoded = null;
      next()
    }
 });

module.exports = protectedRoutes;

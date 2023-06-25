const jwt = require('jsonwebtoken');
// const transporter = require('../config/nodemailer');
const urlRecoverPassword = process.env.URL_RECOVER;
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const regex = require('../utils/regex');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const users = require ('../models/usersModels')

console.log('estoy en controladores');

const signUpUser = async(req, res) => {
    console.log('estoy en signup user ');
    let data;
    try {
        const {name, surname, email, city, password} = req.body;
        console.log(name, surname, email, city, password);
        const hashPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashPassword);
        if(regex.validateEmail(email) && regex.validatePassword(password) && regex.validateName(name) && regex.validateSurname(surname)){
            data = await users.createUser({ 'name': name, 'surname': surname, 'email': email, 'city': city, 'password': hashPassword, 'logged': false});
            // res.status(201).json(data);
            // console.log(data);
            res.redirect(`/users/profile?name=${name}&surname=${surname}&email=${email}&city=${city}`);
        }else{
            res.status(400).json({msg: 'Invalid email or password'});
        }
    } catch (error) {
        console.log('Error:', error);
    }
};


const loginUser = async(req, res) => {
    let data;
    try {
        const {email, password} = req.body
        data = await users.findOne({'email': email}, '-_id -__v');
        if(!data){
            res.status(400).json({ msg: 'Incorrect user or password'}); 
        }else{
            const match = await bcrypt.compare(password, data.password);
            if(match){
                await users.updateOne({ email: req.body.email }, { logged: true })
                const {email, username} = data;
                const userForToken = {
                    email: email,
                    username: username,
                };
                const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '20m'});
                res
                .status(200)
                .json({
                    msg:'Correct authentication',
                    token: token});
            }else {
                res.status(400).json({ msg: 'Incorrect user or password'});
            }
        }        
    } catch (error) {
        console.log('Error:', error);
    }
};





const getAllUsers = async (req, res) => {
    let user;
    if (req.query) {
        user = await users.getAllUsers(req.query);
    }
    else {
        user = await users.getAllUsers();
    }
    res.status(200).json(user); // [] con las entries encontradas
}


const getUserByEmail = async (req, res) => {
    let user = await users.getUserByEmail(req.params.email);
  
    res.status(200).json(user); 
}

const createUser = async (req, res) => {
    const dataUser = req.body; 
    const response = await users.createUser(dataUser);
    res.status(201).json({
        "usuario creado:": response,
        data: dataUser
    });
}



module.exports = {
    signUpUser,
    loginUser,
    getAllUsers,
    getUserByEmail,
    createUser
}
const jwt = require('jsonwebtoken');
// const transporter = require('../config/nodemailer');
const urlRecoverPassword = process.env.URL_RECOVER;
const jwt_secret = process.env.ULTRA_SECRET_KEY;
const regex = require('../utils/regex');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const users = require ('../models/usersModels')


const signUpUser = async(req, res) => {
    let data;
    try {
        const {name, surname, email, city, password} = req.body;
                // console.log(name, surname, email, city, password);
        const hashPassword = await bcrypt.hash(password, saltRounds);
                // console.log(hashPassword);
        if(regex.validateEmail(email) && regex.validatePassword(password) && regex.validateName(name) && regex.validateSurname(surname)){
            data = await users.createUser({ 'name': name, 'surname': surname, 'email': email, 'city': city, 'password': hashPassword, 'logged': false});
            // res.status(201).json(data);
            res.redirect(`/`);
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
        const {email, password} = req.body;
        console.log(email, password);
        data = await users.getUserByEmail(email);
        console.log(data);

        if(!data){
            res.status(400).json({ msg: 'Incorrect user or password'}); 
        }else{
            const match = await bcrypt.compare(password, data[0].password);
            if(match){
                let userLoggued = true;
                await users.updateUser(userLoggued, data[0].email)
                const userForToken = {
                    email: data.email,
                    name: data.name,
                    surname: data.surname,
                    city: data.city
                };
                const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '10m'});
                console.log(token);
                res.cookie("access-token", token, {
                    httpOnly: true,
                    sameSite: "strict",
                });
                res.redirect(`/users/profile?name=${data[0].name}&surname=${data[0].surname}&email=${data[0].email}&city=${data[0].city}`);
                // res.redirect(`/users/profile?t=${token}`);
                console.log('cookie realizada');
                
                
                
            }else {
                res.status(400).json({ msg: 'Incorrect user or password'});
            }
        }        
    } catch (error) {
        console.log('Error:', error);
    }
};



const logout = async(req, res) => {
    let data;
    let logged = false;
    try {
        data = await users.updateUser(logged, req.params.email );
        res.redirect(`/`);
        console.log('usuario fuera de sesión');
    } catch (error) {
        console.log('Error:', error);
    }
}




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
    createUser,
    logout
}
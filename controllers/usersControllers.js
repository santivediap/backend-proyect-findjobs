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

const loginUser = async (req, res) => {
    try{

        const { email, password } = req.body
    
        const searchedUser = await users.getUserByEmail(email)
    
        console.log(searchedUser[0].password);
        
        const match = await bcrypt.compare(password, searchedUser[0].password);
                if(match){
                    await users.updateUser(true, email)
                    const userForToken = {
                        name: searchedUser[0].name,
                        surname: searchedUser[0].surname,
                        email: searchedUser[0].email,
                        city: searchedUser[0].city
                    };
    
                    console.log(searchedUser[0].name, searchedUser[0].email);
    
                    const token = jwt.sign(userForToken, jwt_secret, {expiresIn: '10m'});
    
                    console.log(token);
    
                    res.status(200).cookie("access-token", token);
                    res.redirect(`/users/profile?t=${token}`);
                    
                } else {
                    res.json({
                        "response": "ERROR!"
                    })
                }

    } catch (error) {
        console.log('Error:', error);
    }
}



const logout = async(req, res) => {

    const { email } = req.decoded;

    let data;
    let logged = false;
    try {
        data = await users.updateUser(logged, email);
        res.clearCookie("access-token")
        res.redirect(`/`);
        console.log('Usuario fuera de sesión');
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
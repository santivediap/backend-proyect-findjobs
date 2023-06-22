const users = require ('../models/usersModels')


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


// const updateUser = async (req, res) => {
//     const dataUser = req.body;
//     const response = await users.updateUser(dataUser);
//     res.status(200).json({
//         "Usuario actualizado": response,
//         data: dataUser
//     });
// }


module.exports = {
    getAllUsers,
    getUserByEmail,
    // updateUser,
    createUser
}
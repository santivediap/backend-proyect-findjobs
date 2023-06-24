const pool = require('../utils/db_pgsql');
const usersQueries = require ('../queries/users.queries');


const getAllUsers = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(usersQueries.getAllUsers)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const getUserByEmail = async (email) => {  // el email hay que cogerlo desde el token de usuario y codificarlo en una función que está en el middleware de la demo de tokens y autenticación.
    let client, result;
    try {
        client = await pool.connect();
        console.log(email);
        const data = await client.query(usersQueries.getUserByEmail,[email]);
        result = data.rows
        console.log(result);
    } catch (err) {
        console.log(err);
        throw err;
    } 
    finally {  
        if(client){ 
            client.release(); 
        }
    }
    return result
}

const createUser = async (user_data) => { // user_data es por donde llega el objeto queries de queries
    const { name, surname, email, city, password } = user_data;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(usersQueries.createUser,[name, surname, email, city, password])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } 
    // finally {
    //     client.release();
    // }
    return result
}


module.exports = {
    getAllUsers,
    getUserByEmail,
    createUser
    // updateUser,
}
// {
//     "name": "Jorge"
//     "surname": "blas"
//     "email": "jorge@gmail"
//     "city": "madrid"
// }


// const updateUser = async (user_data) => { 
//     const { name, surname, email_1, city, email_2  } = user_data;
//     let client, result;
//     try {
//         client = await pool.connect(); // Espera a abrir conexion
//         const data = await client.query(usersQueries.updateUser,[name, surname, email_1, city, email_2 ])
//         result = data.rowCount
//     } catch (err) {
//         console.log(err);
//         throw err;
//     } finally {
//         client.release();
//     }
//     return result
// }



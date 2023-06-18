const pool = require('../utils/db_pgsql');
const usersQueries = require ('../models/users.queries');




const getUserByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(usersQueries.getUserByEmail,[email]);
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {  
        client.release(); 
    }
    return result
}

const createUser = async (user_data) => { // user_data es por donde llega el objeto queries de queries
    const { name, surname, email, city } = user_data;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(usersQueries.createUser,[name, surname, email, city])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

const updateUser = async (user_data) => { 
    const { name, surname, email_1, city, email_2  } = user_data;
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(usersQueries.updateUser,[name, surname, email_1, city, email_2 ])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}



module.exports = {
    getUserByEmail,
    updateUser,
    createUser
}
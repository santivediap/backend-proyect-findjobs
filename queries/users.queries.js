const usersQueries = {
    getAllUsers: `SELECT name, surname, email, city 
        FROM users;`,
    getUserByEmail: `
        SELECT name, surname, email, city
        FROM users
        where email=$1;`,
    createUser: `INSERT INTO users(
        name, surname, email, city, password, logged)
        VALUES ($1, $2, $3, $4, $5, TRUE);`,
    updateUser: `UPDATE user
        SET name= $1, surname=$2, email=$3, city=$4
        WHERE email =$5;`
}
module.exports = usersQueries;



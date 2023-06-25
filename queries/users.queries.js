const usersQueries = {
    getAllUsers: `SELECT name, surname, email, city 
        FROM users;`,
    getUserByEmail: `
        SELECT name, surname, email, city, password, logged
        FROM users
        where email=$1;`,
    createUser: `INSERT INTO users(
        name, surname, email, city, password, logged)
        VALUES ($1, $2, $3, $4, $5, FALSE);`,
    updateUser: `UPDATE users
        SET logged=$1
        WHERE email =$2;`
}
module.exports = usersQueries;



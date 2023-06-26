const usersQueries = {
    getAllUsers: `SELECT name, surname, email, city 
        FROM users;`,
    getUserByEmail: `
        SELECT name, surname, email, city, password, role, logged
        FROM users
        where email=$1;`,
    createUser: `INSERT INTO users(
        name, surname, email, city, password, role, logged)
        VALUES ($1, $2, $3, $4, $5, 'user', FALSE);`,
    updateUser: `UPDATE users
        SET logged=$1
        WHERE email =$2;`
}
module.exports = usersQueries;



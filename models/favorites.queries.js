
const users_favorites = {
    createTable: `CREATE TABLE favorites (
        id_offer INT PRIMARY KEY,
        user_id INT,
        company_name VARCHAR(100),
        title VARCHAR(100),
        description TEXT,
        location VARCHAR(100),
        salary DECIMAL(10, 2),
        date DATE,
        FOREIGN KEY (user_id) REFERENCES users(_user)
        );`,
    deleteFavorite: `DELETE FROM favorites WHERE title = $1;`,
    addFavorite:`INSERT INTO favorites (id_offer, user_id, company_name, title, description, location, salary, date)
    VALUES ($1, (SELECT id_user FROM authors WHERE email=$2), $3, $4, $5, $6, $7, $8);
    `
}
module.exports = users_favorites;
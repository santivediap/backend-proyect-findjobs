const users_favorites = {
  // company name, title,  ubicación,tipo de jornada, experiencia, tipo contrato, salario, description
  allUserFavorites: `SELECT *
        FROM favorites
        WHERE user_id = $1;`,
  addFavorite: `INSERT INTO favorites (user_id, title, company_name, location, experience, work_schedule, contract_type, salary, description)
        VALUES ((SELECT user_id FROM users WHERE email=$1), $2, $3, $4, $5, $6, $7, $8, $9);`,
  deleteFavorite: `DELETE FROM favorites WHERE title = $1;`,
};
module.exports = users_favorites;

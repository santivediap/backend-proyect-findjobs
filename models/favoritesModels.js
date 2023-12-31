const pool = require("../utils/db_pgsql");
const usersFavorites = require("../queries/favorites.queries");
const usersQueries = require("../queries/users.queries");

const getAllFavorites = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    const searchedUser = await client.query(usersQueries.getUserByEmail, [
      email,
    ]);
    // console.log("Result");

    // console.log(searchedUser.rows[0]);
    const data = await client.query(usersFavorites.allUserFavorites, [
      searchedUser.rows[0].user_id,
    ]);
    result = data.rows;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

const createFavorites = async (offer_data) => {
  const {
    email,
    title,
    company_name,
    location,
    experience,
    work_schedule,
    contract_type,
    salary,
    description,
  } = offer_data;
  let client, result;

  try {
    client = await pool.connect();
    const data = await client.query(usersFavorites.addFavorite, [
      email,
      title,
      company_name,
      location,
      experience,
      work_schedule,
      contract_type,
      salary,
      description,
    ]);
    result = data.rowCount;
    // console.log(result);
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

// {
//     "title":"full-stack con React y Angular",
//     "company_name":"TecnoPro Webs",
//     "location":"Córdoba",
//     "experience":"2 años",
//     "work_schedule":"Jornada Intensiva"
//     "contract_type":"Indefinido",
//     "salary":"50.000€",
//     "description":"dfpoifcnqwijf poidf pqiwf psidhf poihdfpo doh "
// }

const deleteFavorite = async (offer) => {
  const { title } = offer;
  let client, result;
  try {
    client = await pool.connect();
    const data = await client.query(usersFavorites.deleteFavorite, [title]);
    result = data.rowCount;
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    client.release();
  }
  return result;
};

module.exports = {
  getAllFavorites,
  createFavorites,
  deleteFavorite,
};

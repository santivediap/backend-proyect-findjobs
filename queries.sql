--  USERS DATA TABLE --
CREATE TABLE users (
  user_id serial NOT NULL PRIMARY KEY, 
  name VARCHAR(25),
  surname VARCHAR(25),
  email VARCHAR(60) UNIQUE, 
  city VARCHAR(30),
  password VARCHAR(100),
  role VARCHAR(10),
  logged BOOLEAN
);

--  FAVORITES TABLE --
CREATE TABLE favorites (
  id serial NOT NULL PRIMARY KEY,
  user_id INT,
  title VARCHAR(100),
  company_name VARCHAR(50),
  location VARCHAR(40),
  experience VARCHAR(30),
  contract_type VARCHAR(30),
  work_schedule VARCHAR(40),
  salary VARCHAR(40),
  description TEXT,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);




-- INSERT NEW JOB OFFER AS FAVORITE --
INSERT INTO favorites (id, user_id, company_name, title, description, location, salary, date)
VALUES (1, 1, 'Nombre de la compañía', 'Título de la oferta', 'Descripción de la oferta', 'Ubicación de la oferta', 50000.00, '2023-06-18');

-- INSERT A NEW USER --
INSERT INTO users (id, name, surname, email, city)
VALUES (1, 'John', 'Doe', 'johndoe@example.com', 'New York');

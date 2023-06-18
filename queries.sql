--  USERS DATA TABLE --
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(25),
  surname VARCHAR(25),
  email VARCHAR(60),
  city VARCHAR(30)
);

--  FAVORITES TABLE --
CREATE TABLE favorites (
  id INT PRIMARY KEY,
  user_id INT,
  company_name VARCHAR(50),
  title VARCHAR(100),
  description TEXT,
  location VARCHAR(40),
  salary DECIMAL(6, 2),
  date DATE,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- INSERT NEW JOB OFFER AS FAVORITE --
INSERT INTO favorites (id, user_id, company_name, title, description, location, salary, date)
VALUES (1, 1, 'Nombre de la compañía', 'Título de la oferta', 'Descripción de la oferta', 'Ubicación de la oferta', 50000.00, '2023-06-18');

-- INSERT A NEW USER --
INSERT INTO users (id, name, surname, email, city)
VALUES (1, 'John', 'Doe', 'johndoe@example.com', 'New York');

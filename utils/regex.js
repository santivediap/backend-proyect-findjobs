const { Long } = require("mongodb")

let regexName = /^(?=.*[a-zA-ZáéíóúÁÉÍÓÚñÑ'-]+).{2,}$/

  // Validar nombre
const validateName = (userName) => {
    console.log('nombre validado');
      return regexName.test(userName);
}

// Validar apellido
const validateSurname = (userSurname) => {
    console.log('apellido validado');
    return regexName.test(userSurname)
}

// Validar email
const validateEmail = (email) => {
    const regexEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    console.log('email validado');
    return regexEmail.test(email.toLowerCase())
};

// Validar contraseña
const validatePassword = (password) => {
    const regexPassword =  /^(?=.*[a-zA-Z])(?=.*\d).{6,}$/;
    console.log('contraseña validado');

    return regexPassword.test(password)
};


const regex = {
    validateName,
    validateSurname,
    validateEmail,
    validatePassword
};

module.exports = regex;
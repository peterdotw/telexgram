const Joi = require("@hapi/joi");

const registerValidation = data => {
  const registerSchema = {
    login: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required(),
    confirmPassword: Joi.string()
      .min(6)
      .valid(Joi.ref("password"))
      .required()
  };

  return Joi.validate(data, registerSchema);
};

const loginValidation = data => {
  const loginSchema = {
    login: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };

  return Joi.validate(data, loginSchema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

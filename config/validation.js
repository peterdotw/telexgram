const Joi = require("@hapi/joi");

const registerValidation = data => {
  const schema = {
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

  return Joi.validate(data, schema);
};

const loginValidation = data => {
  const schema = {
    login: Joi.string()
      .min(6)
      .required(),
    password: Joi.string()
      .min(6)
      .required()
  };

  return Joi.validate(data, schema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

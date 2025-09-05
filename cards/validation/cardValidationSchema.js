import Joi from "joi";

const urlRegex =
  /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

const cardSchema = Joi.object({
  title: Joi.string().min(2).max(256).required(),
  subtitle: Joi.string().min(2).max(256).required(),
  description: Joi.string().min(2).max(1024).required(),

  phone: Joi.string()
    .pattern(/0[0-9]{1,2}\-?\s?[0-9]{3}\s?[0-9]{4}/)
    .required()
    .messages({
      "string.pattern.base": "Phone must be a valid phone number",
    }),

  email: Joi.string().email().required().messages({
    "string.email": "Email must be a valid email address",
  }),

  web: Joi.string().pattern(urlRegex).allow("").messages({
    "string.pattern.base": "Web must be a valid URL",
  }),

  image: Joi.object({
    url: Joi.string().pattern(urlRegex).allow("").messages({
      "string.pattern.base": "Image URL must be a valid URL",
    }),
    alt: Joi.string().min(2).max(256).allow(""),
  }).required(),

  address: Joi.object({
    state: Joi.string().allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().required(),
    zip: Joi.number().optional(),
  }).required(),

  bizNumber: Joi.number().optional(),
  user_id: Joi.string().optional(),
});

export default cardSchema;

import Joi from "joi";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{4,})(?=.*[!@%$#^&*\-_])[A-Za-z\d!@%$#^&*\-_]{8,}$/;

const userSchema = Joi.object({
  name: Joi.object({
    first: Joi.string().min(2).max(256).required(),
    middle: Joi.string().min(2).max(256).allow(""),
    last: Joi.string().min(2).max(256).required(),
  }).required(),

  phone: Joi.string().min(9).max(11).required(),

  email: Joi.string().min(5).email().required(),

  password: Joi.string().pattern(passwordRegex).required().messages({
    "string.empty": "Password is required",
    "string.pattern.base":
      "Password must be at least 8 characters with 1 uppercase, 1 lowercase, 4 numbers, and 1 special character (!@%$#^&*-_)",
  }),

  image: Joi.object({
    url: Joi.string().uri().min(14).allow(""),
    alt: Joi.string().min(2).max(256).allow(""),
  }),

  address: Joi.object({
    state: Joi.string().min(2).max(256).allow(""),
    country: Joi.string().min(2).max(256).required(),
    city: Joi.string().min(2).max(256).required(),
    street: Joi.string().min(2).max(256).required(),
    houseNumber: Joi.number().min(2).max(256).required(),
    zip: Joi.alternatives()
      .try(
        Joi.number().min(1000).max(9999999),
        Joi.string().allow(""),
        Joi.allow(null)
      )
      .optional(),
  }).required(),

  isBusiness: Joi.boolean().required(),
  isAdmin: Joi.boolean().optional().default(false),
});

export default userSchema;

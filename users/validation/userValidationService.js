import userSchema from "./userValidationSchema.js";

export const validateUser = (user) => {
  return userSchema.validate(user);
};

import _ from "lodash";
import { generateToken } from "../../auth/providers/jwtProvider.js";
import { comparePassword, generatePassword } from "../helpers/bcrypt.js";
import {
  createUser,
  deleteUserInDb,
  getAllUsersFromDb,
  getUserByEmail,
  getUserByIdFromDb,
  updateBusinessStatusInDb,
  updateUserInDb,
} from "./usersDataService.js";
import { validateUser } from "../validation/userValidationService.js";

export const getUserById = async (id) => {
  try {
    const user = await getUserByIdFromDb(id);
    if (!user) {
      throw new Error("User not found");
    }
    const DTOuser = _.pick(user, [
      "email",
      "name",
      "_id",
      "phone",
      "address",
      "image",
      "isBusiness",
      "isAdmin",
    ]);
    return DTOuser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getAllUsers = async () => {
  try {
    const users = await getAllUsersFromDb();
    return users;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createNewUser = async (user) => {
  try {
    const { error } = validateUser(user);
    if (error) {
      console.log(error.details[0].message);
      throw new Error(error.details[0].message);
    }

    let hashPass = generatePassword(user.password);
    user.password = hashPass;

    const newUser = await createUser(user);
    const DTOuser = _.pick(newUser, [
      "name",
      "isBuisness",
      "phone",
      "email",
      "password",
      "address",
      "image",
    ]);
    return DTOuser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const login = async (email, password) => {
  try {
    const user = await getUserByEmail(email);
    if (comparePassword(password, user?.password)) {
      return generateToken(user);
    }
    throw new Error("password incorrect");
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (id, userData) => {
  try {
    if (userData.password) {
      userData.password = generatePassword(userData.password);
    }

    const updatedUser = await updateUserInDb(id, userData);
    const DTOuser = _.pick(updatedUser, [
      "email",
      "name",
      "_id",
      "phone",
      "address",
      "image",
      "isBusiness",
      "isAdmin",
    ]);
    return DTOuser;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteUser = async (id) => {
  try {
    const deletedUserId = await deleteUserInDb(id);
    return deletedUserId;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const updateBusinessStatus = async (id, isBusiness) => {
  try {
    if (typeof isBusiness !== "boolean") {
      throw new Error("isBusiness must be a boolean value");
    }

    const updatedUser = await updateBusinessStatusInDb(id, isBusiness);
    const DTOuser = _.pick(updatedUser, [
      "email",
      "name",
      "_id",
      "phone",
      "address",
      "image",
      "isBusiness",
      "isAdmin",
    ]);
    return DTOuser;
  } catch (error) {
    throw new Error(error.message);
  }
};

import mongoose from "mongoose";
import User from "../models/User.js";

export const getAllUsersFromDb = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    console.error("Error getting all users:", error);
    throw new Error("Database error while fetching users");
  }
};

export const getUserByIdFromDb = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID format");
    }

    const user = await User.findById(id);
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.error("Error getting user by ID:", error);
    throw new Error(error.message);
  }
};

export const createUser = async (user) => {
  try {
    const userForDb = new User(user);

    await userForDb.save();

    return userForDb;
  } catch (error) {
    console.error("Mongo error:", error);

    if (error.code === 11000 && error.keyPattern?.email) {
      throw new Error("Email already exists");
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);

      throw new Error(`Validation failed: ${messages.join(", ")}`);
    }

    if (
      error.name === "MongoNetworkError" ||
      error.message.includes("ECONNREFUSED")
    ) {
      throw new Error("Database connection error");
    }

    throw new Error("MongoDb - Error in creating new user");
  }
};

export const updateUserInDb = async (id, newUser) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID format");
    }

    const userAfterUpdate = await User.findByIdAndUpdate(id, newUser, {
      new: true,
    });

    if (!userAfterUpdate) {
      throw new Error("User not found");
    }

    return userAfterUpdate;
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error(error.message);
  }
};

export const deleteUserInDb = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID format");
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    return id;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error(error.message);
  }
};

export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Email Not Found");
    }
    return user;
  } catch (error) {
    console.log(error);
    throw new Error(error.message);
  }
};

export const updateBusinessStatusInDb = async (id, isBusiness) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid user ID format");
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { isBusiness: isBusiness },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  } catch (error) {
    console.error("Error updating business status:", error);
    throw new Error(error.message);
  }
};

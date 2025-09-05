import express from "express";

import {
  createNewUser,
  getAllUsers,
  getUserById,
  login,
  updateUser,
  deleteUser,
  updateBusinessStatus,
} from "../services/usersService.js";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    res.send(user);
  } catch (error) {
    if (error.message.includes("Invalid user ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("User not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await getAllUsers();
    res.send(allUsers);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = req.body;
    const user = await createNewUser(newUser);
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post("/login", async (req, res) => {
  const { password, email } = req.body;
  try {
    const token = await login(email, password);
    res.send(token);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;
    const updatedUser = await updateUser(id, userData);
    res.send(updatedUser);
  } catch (error) {
    if (error.message.includes("Invalid user ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("User not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUserId = await deleteUser(id);
    res.send({ message: "User deleted successfully", id: deletedUserId });
  } catch (error) {
    if (error.message.includes("Invalid user ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("User not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isBusiness } = req.body;
    const updatedUser = await updateBusinessStatus(id, isBusiness);
    res.send(updatedUser);
  } catch (error) {
    if (error.message.includes("Invalid user ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("User not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

export default router;

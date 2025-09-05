import express from "express";
import {
  createNewCard,
  deleteCard,
  getAllCards,
  getCardById,
  updateCard,
  toggleLike,
  changeBizNumber,
} from "../services/cardsService.js";
import { auth } from "../../auth/services/authService.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allCards = await getAllCards();
    res.send(allCards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const user = req.user;
    const allCards = await getAllCards();

    const userCards = allCards.filter((card) => card.user_id === user._id);

    res.send(userCards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const card = await getCardById(id);
    res.send(card);
  } catch (error) {
    if (error.message.includes("Invalid card ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("Card not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const newCard = req.body;
    const user = req.user;

    if (!user.isBusiness) {
      return res.status(403).send("Only Business users can create cards");
    }

    const cardResult = await createNewCard(newCard, user._id);
    res.status(201).send(cardResult);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const newCard = req.body;
    const user = req.user;

    const existingCard = await getCardById(id);
    if (!user.isAdmin && existingCard.user_id !== user._id) {
      return res
        .status(403)
        .send("Only Admin or card owner can update this card");
    }

    const modifiedCard = await updateCard(id, newCard);
    res.send(modifiedCard);
  } catch (error) {
    if (error.message.includes("Invalid card ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("Card not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(400).send(error.message);
    }
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const card = await getCardById(id);
    if (!user.isAdmin && card.user_id !== user._id) {
      return res
        .status(403)
        .send("Only Admin or card owner can delete this card");
    }

    const idOfDeletedCard = await deleteCard(id);
    res.send({ message: "Card deleted successfully", id: idOfDeletedCard });
  } catch (error) {
    if (error.message.includes("Invalid card ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("Card not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.user;

    const updatedCard = await toggleLike(id, user._id);
    res.send(updatedCard);
  } catch (error) {
    if (error.message.includes("Invalid card ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("Card not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(500).send(error.message);
    }
  }
});

router.patch("/:id/biz-number", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { bizNumber } = req.body;
    const user = req.user;

    if (!user.isAdmin) {
      return res.status(403).send("Only Admin can change business numbers");
    }

    const updatedCard = await changeBizNumber(id, bizNumber);
    res.send(updatedCard);
  } catch (error) {
    if (error.message.includes("Invalid card ID format")) {
      res.status(400).send(error.message);
    } else if (error.message.includes("Card not found")) {
      res.status(404).send(error.message);
    } else {
      res.status(400).send(error.message);
    }
  }
});

export default router;

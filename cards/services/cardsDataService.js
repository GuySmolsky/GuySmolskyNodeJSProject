import mongoose from "mongoose";
import Card from "../models/Card.js";

export const getAllCardsFromDb = async () => {
  try {
    const cards = await Card.find();
    return cards;
  } catch (error) {
    console.error("Error getting all cards:", error);
    throw new Error("Database error while fetching cards");
  }
};

export const getCardByIdFromDb = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid card ID format");
    }

    const card = await Card.findById(id);
    if (!card) {
      throw new Error("Card not found");
    }
    return card;
  } catch (error) {
    console.error("Error getting card by ID:", error);
    throw new Error(error.message);
  }
};

export const createCard = async (card) => {
  try {
    const cardForDb = new Card(card);
    await cardForDb.save();
    return cardForDb;
  } catch (error) {
    console.error("Error creating card:", error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((e) => e.message);
      throw new Error(`Validation failed: ${messages.join(", ")}`);
    }

    throw new Error(error.message);
  }
};

export const updateCardInDb = async (id, newCard) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid card ID format");
    }

    const cardAfterUpdate = await Card.findByIdAndUpdate(id, newCard, {
      new: true,
    });

    if (!cardAfterUpdate) {
      throw new Error("Card not found");
    }

    return cardAfterUpdate;
  } catch (error) {
    console.error("Error updating card:", error);
    throw new Error(error.message);
  }
};

export const deleteCardInDb = async (id) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid card ID format");
    }

    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      throw new Error("Card not found");
    }

    return id;
  } catch (error) {
    console.error("Error deleting card:", error);
    throw new Error(error.message);
  }
};

export const toggleLikeInDb = async (cardId, userId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      throw new Error("Invalid card ID format");
    }

    const card = await Card.findById(cardId);
    if (!card) {
      throw new Error("Card not found");
    }

    const userIndex = card.likes.indexOf(userId);

    if (userIndex === -1) {
      card.likes.push(userId);
    } else {
      card.likes.splice(userIndex, 1);
    }

    await card.save();
    return card;
  } catch (error) {
    console.error("Error toggling like:", error);
    throw new Error(error.message);
  }
};

export const changeBizNumberInDb = async (cardId, newBizNumber) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(cardId)) {
      throw new Error("Invalid card ID format");
    }

    const cardAfterUpdate = await Card.findByIdAndUpdate(
      cardId,
      { bizNumber: newBizNumber },
      { new: true }
    );

    if (!cardAfterUpdate) {
      throw new Error("Card not found");
    }

    return cardAfterUpdate;
  } catch (error) {
    console.error("Error changing biz number:", error);
    throw new Error(error.message);
  }
};

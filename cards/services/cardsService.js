import { validateCard } from "../validation/cardValidationService.js";
import {
  changeBizNumberInDb,
  createCard,
  deleteCardInDb,
  getAllCardsFromDb,
  getCardByIdFromDb,
  toggleLikeInDb,
  updateCardInDb,
} from "./cardsDataService.js";

export const getAllCards = async () => {
  try {
    const cards = await getAllCardsFromDb();
    return cards;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const getCardById = async (id) => {
  try {
    const card = await getCardByIdFromDb(id);
    return card;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createNewCard = async (card, userId) => {
  try {
    card.bizNumber = generateBizNumber();
    card.user_id = userId;

    const { error } = validateCard(card);
    if (error) {
      console.log(error.details[0].message);
      throw new Error(error.details[0].message);
    }

    const newCard = await createCard(card);
    return newCard;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCard = async (id, newCard) => {
  try {
    const { error } = validateCard(newCard);
    if (error) {
      console.log(error.details[0].message);
      throw new Error(error.details[0].message);
    }

    const modifiedCard = await updateCardInDb(id, newCard);
    return modifiedCard;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const deleteCard = async (id) => {
  try {
    const idOfDeletedCard = await deleteCardInDb(id);
    return idOfDeletedCard;
  } catch (error) {
    throw new Error(error.message);
  }
};

const generateBizNumber = () => {
  return Math.floor(1000000 + Math.random() * 9000000);
};

export const toggleLike = async (cardId, userId) => {
  try {
    const updatedCard = await toggleLikeInDb(cardId, userId);
    return updatedCard;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const changeBizNumber = async (cardId, newBizNumber) => {
  try {
    if (!newBizNumber || newBizNumber.toString().length !== 7) {
      throw new Error("Business number must be exactly 7 digits");
    }

    const updatedCard = await changeBizNumberInDb(cardId, newBizNumber);
    return updatedCard;
  } catch (error) {
    throw new Error(error.message);
  }
};

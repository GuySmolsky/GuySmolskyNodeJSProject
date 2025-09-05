import jwt from "jsonwebtoken";
import "dotenv/config";
const secretWord = process.env.JWT_SECRET;

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,

      isBusiness: user.isBusiness,

      isAdmin: user.isAdmin,
    },

    secretWord
  );

  return token;
};

export const verifyToken = (tokenFromClient) => {
  try {
    const userDataFromPayload = jwt.verify(tokenFromClient, secretWord);

    return userDataFromPayload;
  } catch (error) {
    return null;
  }
};

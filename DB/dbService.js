import mongoose from "mongoose";
import "dotenv/config";

const dbUrl =
  process.env.ENVIRONMENT === "production"
    ? process.env.DATABASE_ATLAS_URL
    : process.env.DATABASE_URL;

export const connectToDb = () => {
  const environment =
    process.env.ENVIRONMENT === "production" ? "Atlas Cloud" : "Local";

  mongoose
    .connect(dbUrl)
    .then(() => console.log(`Connected to MongoDB ${environment}!`))
    .catch((error) => console.log(`Could not connect to MongoDB: ${error}`));
};

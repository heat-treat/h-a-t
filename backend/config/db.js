import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      "mongodb+srv://tastecode1525_db_user:tastecode1525@cluster0.brhf8ka.mongodb.net/hat"
    )
    .then(() => console.log("DB Connected"));
};

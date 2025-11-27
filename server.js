const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./database/db");

//env configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

//middleware to parse JSON requests
app.use(express.json());

//importing routes
const bookRoutes = require("./routes/book-routes");

const main = async () => {
  try {
    await connectDB();

    //using routes
    app.use("/api/books", bookRoutes);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error : ", error);
  }
};

main();

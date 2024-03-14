import "./config.js";
import app from "./app.js";
import mongoose from "mongoose";

const port = process.env.PORT || 8000;

const dbConnection = process.env.DATABASE_CONNECTION_STRING.replace(
  "<password>",
  process.env.PASSWORD
);

mongoose.set("strictQuery", true);

mongoose
  .connect(dbConnection)
  .then((conn) => {
    console.log("connection established with database");
  })
  .catch((err) => {
    console.log(err.message, "errored with db connection");
  });

app.listen(port, () => {
  console.log(`Listening to the port ${port}...`);
});

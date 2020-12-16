const mongoose = require("mongoose");

const dotenv = require("dotenv");

dotenv.config();

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })

  .then(() => {
    console.log("DB connection successful");
  });

const app = require("./app");

const server = app.listen(process.env.PORT, () => {
  console.log(`app running in port ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection  shutting down....");
  server.close(() => {
    process.exit(1);
  });
});

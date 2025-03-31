import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("working");
});

app.listen(5000, () => {
  console.log("Server is listening on PORT 5000");
});

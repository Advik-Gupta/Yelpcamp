const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ____________________________________________________________________________________________________

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const Campground = require("./models/campground");

// ____________________________________________________________________________________________________

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/makecampground", async (req, res) => {
  const camp = new Campground({
    title: "My Backyard",
    description: "cheap camping!",
    price: "50",
    location: "Somewhere",
  });
  await camp.save();
  res.send(camp);
});

// ____________________________________________________________________________________________________

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

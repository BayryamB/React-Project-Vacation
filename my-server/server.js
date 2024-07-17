const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3030;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/Angular-Project", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB");
});

app.use(cors());

// Define User schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  email: String,
  watchlist: [String],
  likes: [String],
});
const User = mongoose.model("User", userSchema);

// Define Destination schema
const destinationSchema = new mongoose.Schema({
  name: { type: String },
  country: { type: String },
  description: String,
  photos: [String],
});

const Destination = mongoose.model("Destination", destinationSchema);

// Define rent schema
const rentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who rented
  date: { type: Date, default: Date.now }, // Date of the rent (default to current date)
  location: {
    country: String,
    city: String,
  },
  photos: [String],
  cover: String,
  description: String,
  likes: [String],
  price: Number,
  options: {
    wifi: Boolean,
    parking: Boolean,
    breakfast: Boolean,
    pets: Boolean,
    smoking: Boolean,
  },
});
const Rent = mongoose.model("Rents", rentSchema);

// Middleware to parse JSON
app.use(express.json());

// Register endpoint
app.post("/api/register", async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = new User({
      username: req.body.username,
      password: hashedPassword,
      email: req.body.email,
    });
    await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = jwt.sign({ username: user.username }, "your_secret_key", {
      expiresIn: "1h",
    });
    res.status(200).json({ token: token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get user by ID
app.get("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user found, send it in the response
    res.json(user);
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ error: error.message });
  }
});

// Update user by ID
app.put("/api/users/:id", async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Find the user by ID and update it in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user is updated successfully, send it in the response
    res.json(updatedUser);
  } catch (error) {
    // If there's an error, send an error response
    res.status(500).json({ error: error.message });
  }
});
const rentShortSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to the user who rented
  date: { type: Date, default: Date.now }, // Date of the rent (default to current date)
  location: {
    country: String,
    city: String,
  },
  photos: [String],
  cover: String,
  description: String,
  likes: [String],
  price: Number,
  options: {
    wifi: Boolean,
    parking: Boolean,
    breakfast: Boolean,
    pets: Boolean,
    smoking: Boolean,
  },
});
const RentShort = mongoose.model("RentsShort", rentShortSchema);

// Route handlers
// Get all rents-short
app.get("/api/short", async (req, res) => {
  try {
    const rents = await RentShort.find();
    res.status(200).json(rents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single rent by ID
app.get("/api/short/:id", async (req, res) => {
  try {
    const rent = await RentShort.findById(req.params.id);
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    res.status(200).json(rent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new rent
app.post("/api/short", async (req, res) => {
  try {
    const rent = new RentShort(req.body);
    await rent.save();
    res.status(201).json(rent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing rent
app.put("/api/short/:id", async (req, res) => {
  try {
    const rent = await RentShort.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    res.status(200).json(rent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add item to watchlist
app.post("/api/users/watchlist/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { watchlist: userId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error("Error adding item to watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Remove item from watchlist
app.post("/api/users/unwatchlist/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { watchlist: userId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error("Error removing item from watchlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add likes to a user
app.post("/api/users/like/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error("Error liking item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Remove likes from a user
app.post("/api/users/dislike/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Access the userId from the request body
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true }
    );
    res.json(user);
  } catch (error) {
    console.error("Error disliking item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add likes to a rent
app.post("/api/short/like/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const rent = await RentShort.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    res.json(rent);
  } catch (error) {
    console.error("Error liking item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Remove likes from a rent
app.post("/api/short/dislike/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Access the userId from the request body
  try {
    const rent = await RentShort.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true }
    );
    res.json(rent);
  } catch (error) {
    console.error("Error disliking item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a rent
app.delete("/api/short/:id", async (req, res) => {
  try {
    const rent = await RentShort.findByIdAndDelete(req.params.id);
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    res.status(204).end(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all destinations
app.get("/api/destinations", async (req, res) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get destination by ID
app.get("/api/destinations/:id", async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new destination
app.post("/api/destinations", async (req, res) => {
  try {
    const destination = new Destination(req.body);
    await destination.save();
    res.status(201).json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update destination by ID
app.put("/api/destinations/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.json(destination);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete destination by ID
app.delete("/api/destinations/:id", async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination) {
      return res.status(404).json({ error: "Destination not found" });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route handlers
// Get all rents
app.get("/api/rents", async (req, res) => {
  try {
    const rents = await Rent.find();
    res.status(200).json(rents);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single rent by ID
app.get("/api/rents/:id", async (req, res) => {
  try {
    const rent = await Rent.findById(req.params.id);
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    res.status(200).json(rent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new rent
app.post("/api/rents", async (req, res) => {
  try {
    const rent = new Rent(req.body);
    await rent.save();
    res.status(201).json(rent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update an existing rent
app.put("/api/rents/:id", async (req, res) => {
  try {
    const rent = await Rent.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    res.status(200).json(rent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add likes to a rent
app.post("/api/rents/like/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  try {
    const rent = await Rent.findByIdAndUpdate(
      id,
      { $addToSet: { likes: userId } },
      { new: true }
    );
    res.json(rent);
  } catch (error) {
    console.error("Error liking item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Remove likes from a rent
app.post("/api/rents/dislike/:id", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // Access the userId from the request body
  try {
    const rent = await Rent.findByIdAndUpdate(
      id,
      { $pull: { likes: userId } },
      { new: true }
    );
    res.json(rent);
  } catch (error) {
    console.error("Error disliking item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a rent
app.delete("/api/rents/:id", async (req, res) => {
  try {
    const rent = await Rent.findByIdAndDelete(req.params.id);
    if (!rent) {
      return res.status(404).json({ message: "Rent not found" });
    }
    res.status(204).end(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route to retrieve all users
app.get("/api/users", async (req, res) => {
  try {
    // Retrieve all users from the database
    const users = await User.find();

    // Send the users as a response
    res.status(200).json(users);
  } catch (error) {
    // Handle any errors
    res.status(500).json({ error: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

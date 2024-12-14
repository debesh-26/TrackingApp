const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const JWT_SECRET = "your_jwt_secret";

module.exports = {
  async register(req, res) {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required." });
    }

    try {
      const existingUser = await User.findByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists." });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create(username, hashedPassword);
      res.status(201).json({ message: "User registered successfully." });
    } catch (error) {
      res.status(500).json({ message: "Error registering user." });
    }
  },

  async login(req, res) {
    const { username, password } = req.body;
    try {
      const user = await User.findByUsername(username);

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res
          .status(401)
          .json({ message: "Invalid username or password." });
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ token });
    } catch (error) {
      res.status(500).json({ message: "Error logging in." });
    }
  },
};

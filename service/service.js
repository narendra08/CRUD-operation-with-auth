var Mongoose = require("mongoose");
const userModel = require("../model/model");
const axios = require("axios");
const dotenv = require("dotenv").config();
const DB_URL = process.env.DB_URL;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
class userClass {
  constructor() {
    Mongoose.connect(DB_URL, {
      useNewurlParser: true,
      useUnifiedTopology: true,
    })
      .then(console.log("connected to db"))
      .catch((err) => console.log(err));
    this.user = new userModel();
  }

  generateRandomString(myLength) {
    const chars =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const randomArray = Array.from(
      { length: myLength },
      (v, k) => chars[Math.floor(Math.random() * chars.length)]
    );

    const randomString = randomArray.join("");
    return randomString;
  }

  async register(data) {
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      const userId = generateRandomString(10);
      const dataSet = {
        user_id: userId,
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
        address: data.address,
        status: "Active",
        created_at: new Date(),
      };
      const existingUser = await this.user.findById({ email });
      if (existingUser) {
        return res.status(409).json({ message: "Email already registered" });
      }
      const newUser = await this.user.saveDataInDb(dataSet);
      const token = jwt.sign({ userId: newUser._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      return res
        .status(201)
        .json({ message: "User registered successfully", token });
    } catch (err) {
      return Promise.reject(err);
    }
  }

  async loginUser(email, password) {
    try {
      const User = await this.user.findById({ email });
      if (!User) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(password, User.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
        expiresIn: "24h",
      });

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getUserInfo(userId) {
    try {
      const User = await this.user.findById({ userId });
      if (!User) {
        return res.status(401).json({ message: "Invalid User_id" });
      }
      return Promise.resolve(User);
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async resetpassword(resetToken, newPassword) {
    try {
      const decodedToken = jwt.verify(resetToken, process.env.RESET_SECRET_KEY);
      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid reset token" });
      }

      const user = await this.user.findById(decodedToken.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await this.user.saveDataInDb(user);

      return res.status(200).json({ message: "Password reset successful" });
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
  async updateAccount(data) {
    try {
      const user = await this.user.updateDataInDb(data.user_id, data);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json({message:"account updated successfully"})
    } catch (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async updatePassword(oldPassword, newPassword, user_id) {
    try {
      const user = await this.user.findById(user_id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();
  
      res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
  
}

module.exports = userClass;

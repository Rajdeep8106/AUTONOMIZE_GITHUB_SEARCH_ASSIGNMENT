const axios = require("axios");
const User = require("../models/userModel");

// 1. Save GitHub user details
exports.saveUserDetails = async (req, res) => {
  const { username } = req.params;
  try {
    let user = await User.findOne({ username });
    if (user) {
      return res.status(200).json({ message: "User data already exists", user });
    }

    const { data } = await axios.get(`https://api.github.com/users/${username}`);
    const newUser = new User({
      username: data.login,
      name: data.name,
      location: data.location,
      blog: data.blog,
      bio: data.bio,
      public_repos: data.public_repos,
      public_gists: data.public_gists,
      followers: data.followers,
      following: data.following,
    });

    await newUser.save();
    res.status(201).json({ message: "User saved successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Find mutual friends
exports.findMutualFriends = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const allUsers = await User.find({});
    const mutualFriends = allUsers.filter(u => 
      user.following.includes(u.username) && 
      u.following.includes(user.username)
    ).map(friend => friend.username);

    user.friends = mutualFriends;
    await user.save();
    res.status(200).json({ message: "Mutual friends found", friends: mutualFriends });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Search users by username or location
exports.searchUsers = async (req, res) => {
  const { query } = req.query; // e.g., ?query=New York
  try {
    const users = await User.find({
      $or: [
        { username: { $regex: query, $options: "i" } },
        { location: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Soft delete a user
exports.softDeleteUser = async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOneAndUpdate(
      { username },
      { isDeleted: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User soft-deleted successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Update user details
exports.updateUser = async (req, res) => {
  const { username } = req.params;
  const updates = req.body; // e.g., { location: "New York", bio: "Updated bio" }
  try {
    const user = await User.findOneAndUpdate({ username }, updates, { new: true });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. List users sorted by a given field
exports.listUsersSorted = async (req, res) => {
  const { sortBy } = req.query; // e.g., ?sortBy=followers
  try {
    const users = await User.find().sort({ [sortBy]: -1 }); // Descending order
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

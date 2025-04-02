const { getTopUsers } = require("../services/userService");

async function handleGetTopUsers(req, res) {
  try {
    const topUsers = await getTopUsers();
    res.json(topUsers);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

module.exports = { handleGetTopUsers };

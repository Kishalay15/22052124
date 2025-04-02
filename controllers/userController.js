const { fetchUsers, fetchPosts } = require("../services/userService");
async function getTopUsers(req, res) {
  try {
    const users = await fetchUsers();
    const posts = await fetchPosts();

    const userPostCount = users
      .map((user) => ({
        id: user.id,
        name: user.name,
        postCount: posts.filter((post) => post.userId === user.id).length,
      }))
      .sort((a, b) => b.postCount - a.postCount);

    res.json(userPostCount.slice(0, 5));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
module.exports = { getTopUsers };

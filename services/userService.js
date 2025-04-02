const { fetchData } = require("../utils/fetchHelper");

async function fetchUsers() {
  return await fetchData("users");
}

async function getTopUsers() {
  const users = await fetchUsers();
  if (!users || !users.users) return [];

  let userPostCounts = [];

  for (const userId of Object.keys(users.users)) {
    try {
      const userPosts = await fetchData(`users/${userId}/posts`);

      const postCount = Array.isArray(userPosts) ? userPosts.length : 0;

      userPostCounts.push({
        id: userId,
        name: users.users[userId],
        postCount: postCount,
      });
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error.message);
    }
  }

  return userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
}

module.exports = { fetchUsers, getTopUsers };

const { fetchData } = require("../utils/fetchHelper");

async function fetchAllPosts() {
  const users = await fetchData("users");
  if (!users || !users.users) return [];

  let allPosts = [];
  for (const userId of Object.keys(users.users)) {
    try {
      const userPosts = await fetchData(`users/${userId}/posts`);
      if (Array.isArray(userPosts)) {
        allPosts.push(...userPosts);
      }
    } catch (error) {
      console.error(`Error fetching posts for user ${userId}:`, error.message);
    }
  }
  return allPosts;
}

async function fetchPostComments(postId) {
  try {
    const response = await fetchData(`posts/${postId}/comments`);
    return response?.comments || [];
  } catch (error) {
    console.error(`Error fetching comments for post ${postId}:`, error.message);
    return [];
  }
}

async function getTopUsers() {
  const users = await fetchData("users");
  if (!users || !users.users) return [];

  let userPostCounts = [];

  for (const userId of Object.keys(users.users)) {
    try {
      const userPosts = await fetchData(`users/${userId}/posts?limit=1`); 
      const postCount = Array.isArray(userPosts) ? userPosts.length : 0;
      userPostCounts.push({
        id: userId,
        name: users.users[userId],
        postCount: postCount,
      });
    } catch (error) {
      console.error(`Error fetching post count for user ${userId}:`, error.message);
    }
  }

  return userPostCounts.sort((a, b) => b.postCount - a.postCount).slice(0, 5);
}

async function getLatestPosts() {
  const posts = await fetchAllPosts();
  return posts
    .filter((p) => p.timestamp)
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, 5);
}

async function getPopularPosts() {
  const posts = await fetchAllPosts();

  for (const post of posts) {
    post.commentsCount = (await fetchPostComments(post.id)).length;
  }

  const validPosts = posts.filter((post) => post.commentsCount > 0);
  if (validPosts.length === 0) return [];

  const maxComments = Math.max(...validPosts.map((p) => p.commentsCount));
  return validPosts.filter((post) => post.commentsCount === maxComments);
}

module.exports = {
  fetchAllPosts,
  fetchPostComments,
  getTopUsers,
  getLatestPosts,
  getPopularPosts,
};

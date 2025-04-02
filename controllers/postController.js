const { fetchAllPosts, fetchPostComments } = require("../services/postService");

async function getPosts(req, res) {
  try {
    const { type } = req.query;
    if (!type || (type !== "popular" && type !== "latest")) {
      return res.status(400).json({ error: "Invalid query parameter" });
    }

    const posts = await fetchAllPosts();
    if (!posts || posts.length === 0) {
      return res.status(404).json({ error: "No posts found" });
    }

    if (type === "popular") {
      const postCommentCounts = await Promise.all(
        posts.map(async (post) => {
          try {
            const comments = await fetchPostComments(post.id);
            return { ...post, commentCount: comments ? comments.length : 0 };
          } catch (err) {
            console.error(`Error fetching comments for post ${post.id}:`, err);
            return { ...post, commentCount: 0 };
          }
        })
      );

      const validPosts = postCommentCounts.filter((p) => p.commentCount > 0);
      if (validPosts.length === 0) {
        return res.json([]);
      }

      const maxComments = Math.max(...validPosts.map((p) => p.commentCount));
      return res.json(validPosts.filter((p) => p.commentCount === maxComments));
    }

    if (type === "latest") {
      const validPosts = posts.filter((post) => post.timestamp);
      validPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return res.json(validPosts.slice(0, 5));
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}

module.exports = { getPosts };

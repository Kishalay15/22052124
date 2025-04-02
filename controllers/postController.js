const { fetchPosts, fetchComments } = require("../services/postService");
async function getPosts(req, res) {
  try {
    const { type } = req.query;
    const posts = await fetchPosts();
    const comments = await fetchComments();

    if (type === "popular") {
      const postCommentCount = posts.map((post) => ({
        ...post,
        commentCount: comments.filter((comment) => comment.postId === post.id)
          .length,
      }));
      const maxComments = Math.max(
        ...postCommentCount.map((p) => p.commentCount)
      );
      return res.json(
        postCommentCount.filter((p) => p.commentCount === maxComments)
      );
    }
    if (type === "latest") {
      posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      return res.json(posts.slice(0, 5));
    }
    res.status(400).json({ error: "Invalid query parameter" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
module.exports = { getPosts };

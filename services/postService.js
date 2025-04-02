const { fetchData } = require("../utils/fetchHelper");
async function fetchPosts() {
  return await fetchData("posts");
}
async function fetchComments() {
  return await fetchData("comments");
}
module.exports = { fetchPosts, fetchComments };

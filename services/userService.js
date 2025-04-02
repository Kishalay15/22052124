const { fetchData } = require("../utils/fetchHelper");
async function fetchUsers() {
  return await fetchData("users");
}
async function fetchPosts() {
  return await fetchData("posts");
}
module.exports = { fetchUsers, fetchPosts };

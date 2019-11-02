const express = require("express");
const stubServer = express();

var mapper = require("./mappings");
stubServer.use((req, res, next) => {
  console.log(`${req.method},${req.path}`);
  next();
});

stubServer.get("/cart", (req, res) => {
  const api = mapper.apis.find(path => path.url === "/cart");
  res.jsonp(require(api.path));
});

stubServer.listen(9002, () => {
  console.log("JSON Server is running");
});

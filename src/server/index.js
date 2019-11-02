import "babel-polyfill"; //to create a pollyfill for async and await
import express from "express";
import renderer from "./helpers/renderer";
import createStore from "./helpers/createStore";
import { apiUrls } from "../utils/proxyUrls";

// Creating an express instance
const app = express();

// Refer to public folder for all the assets
app.use(express.static("public"));

// Proxy setup
process.env.API_ENDPOINT = "http://localhost:9002";
console.log("API_ENDPOINT", process.env.API_ENDPOINT);
const proxy = require("http-proxy-middleware");
app.use(apiUrls, proxy({ target: process.env.API_ENDPOINT }));

app.get("*", (req, res, next) => {
  const store = createStore();
  renderer(req, res, next, store);
});

app.listen(9000, () => {
  console.log("Listening on port 'https://localhost:9000'");
});

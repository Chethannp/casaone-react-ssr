module.exports = {
  apis: [
    {
      url: "/cart",
      path: "./cart-info",
      method: "get",
      proxy: false,
      proxyUrl: "https://www.production.com"
    }
  ]
};

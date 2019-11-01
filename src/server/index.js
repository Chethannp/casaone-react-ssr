import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import Home from "../client/components/Home";

const app = express();

app.use(express.static("public"));

app.get("/", (req, res) => {
  const content = renderToString(<Home />);

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Casaone - Shopping Cart</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no, user-scalable=yes">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="shortcut icon" href="/images/favicon.ico">  
        <script src="bundle.js" defer></script>    
    </head>
    <body>
        <div id="root">${content}</div>
    </body>
    </html>
  `;
  res.send(html);
});

app.listen(9000, () => {
  console.log("Listening on port 9000");
});

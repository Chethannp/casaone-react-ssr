import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "../../client/App";

export default req => {
  const content = renderToString(
    <StaticRouter location={req.path} context={{}}>
      <App />
    </StaticRouter>
  );

  return `
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
};

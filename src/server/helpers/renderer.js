import React from "react";
import { matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../../client/App";
import serialize from "serialize-javascript";
import Routes from "../../routes";

export default (req, res, next, store) => {
  const activeRoute = Routes.find(route => matchPath(req.url, route)) || {};

  const promise = activeRoute.loadData
    ? activeRoute.loadData(store)
    : Promise.resolve();

  promise
    .then(() => {
      //Initial State
      let preloadedState = store.getState();
      let stateJson = serialize(preloadedState);

      const content = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.path} context={{}}>
            <App />
          </StaticRouter>
        </Provider>
      );

      res.send(`
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
                <script>window.__PRELOADED_STATE__ = ${stateJson}</script>
            </body>
          </html>
      `);
    })
    .catch(next);
};

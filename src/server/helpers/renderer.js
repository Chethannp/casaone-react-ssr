import React from "react";
import { matchPath } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "../../client/App";
import serialize from "serialize-javascript";
import Routes from "../../routes";
import { HelmetProvider } from "react-helmet-async";
import { ServerStyleSheet, StyleSheetManager } from "styled-components";

export default (req, res, next, store) => {
  const activeRoute = Routes.find(route => matchPath(req.url, route)) || {};

  const promise = activeRoute.loadData
    ? activeRoute.loadData(store)
    : Promise.resolve();

  promise
    .then(() => {
      //initializing variables
      let content;
      let styleTags;
      let helmetContext = {};

      //Initial State
      let preloadedState = store.getState();
      let stateJson = serialize(preloadedState);

      //Wrapping Styled Sheet to React SSR
      let sheet = new ServerStyleSheet();

      try {
        content = renderToString(
          <HelmetProvider context={helmetContext}>
            <StyleSheetManager sheet={sheet.instance}>
              <Provider store={store}>
                <StaticRouter location={req.url}>
                  <App />
                </StaticRouter>
              </Provider>
            </StyleSheetManager>
          </HelmetProvider>
        );
        styleTags = sheet.getStyleTags();
      } catch (error) {
        console.error(error);
      } finally {
        sheet.seal();
      }

      // Creating an instance of Helmet to pull all the tags out of the library
      let { helmet } = helmetContext;
      res.send(`
        <!DOCTYPE html>
          <html lang="en">
            <head>
                <title>Casaone - Shopping Cart</title>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, shrink-to-fit=no, user-scalable=yes">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                ${helmet.title.toString()}
                ${helmet.meta.toString()}
                ${styleTags}
                <link rel="shortcut icon" href="/images/favicon.ico">  
                <script src="bundle.js" defer></script>
                <style>
                  * {
                      margin: 0;
                      padding: 0;
                  }
                  input,
                  textarea,
                  button {
                      -webkit-appearance: none !important;
                      -webkit-border-radius: 0 !important;
                  }
                  input[type='button'] {
                      cursor: pointer;
                      text-transform: uppercase;
                      -webkit-border-radius: 0px !important;
                  }
                  input[type='submit'] {
                      -webkit-border-radius: 0px;
                  }
                  input, input:focus,
                  textarea,textarea:active, button:focus {
                    outline: none;
                  }
                  html {
                      scroll-behavior: smooth;
                  }
                  body {
                      max-height: 100vh;
                      font-family: "Open Sans", sans-serif;
                      background: #f2f2f2;
                  }
                  div, h1,h2,h3,h4,h5,h6,p,ul,li,button,input,textarea{
                      line-height: 20px;
                  }
                  input[type="date"]::-webkit-calendar-picker-indicator {
                      color: rgba(0, 0, 0, 0);
                      opacity: 1;
                      display: block;
                      background: url(https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/calendar-128.png) no-repeat;
                      background-size: contain;
                      background-position: center;
                      width: 15px;
                      height: 15px;
                      border-width: thin;
                      margin-bottom: 8px;
                  }
              </style>
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

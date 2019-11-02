require("../client/assets/favicon.ico");
import React from "react";
import routes from "../routes";
import { Route, Switch } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "styled-components";
import theme from "../styledComponents/theme";
import NotFoundPage from "./pages/NotFound/notFound";

const App = () => {
  return (
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <Switch>
          {routes.map(({ path, exact, component: Comp, ...rest }) => (
            <Route
              key={path}
              path={path}
              exact={exact}
              render={props => <Comp {...props} {...rest} />}
            />
          ))}
          <Route render={props => <NotFoundPage {...props} />} />
        </Switch>
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;

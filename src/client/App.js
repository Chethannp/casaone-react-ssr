require("../client/assets/favicon.ico");
import React from "react";
import routes from "../routes";
import { Route, Switch } from "react-router-dom";
import NotFoundPage from "./pages/NotFound/notFound";

const App = () => {
  return (
    <Switch>
      {routes.map(({ path, exact, component: C, ...rest }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={props => <C {...props} {...rest} />}
        />
      ))}
      <Route render={props => <NotFoundPage {...props} />} />
    </Switch>
  );
};

export default App;

import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import routes from "./routes";
import DashboardPage from "@/pages/Dashboard";
import CreateRegistrationPage from "@/pages/CreateRegistration";

const Router = () => {
  return (
    <HashRouter>
      <Switch>
        <Route exact path={routes.dashboard} component={DashboardPage} />
        <Route
          exact
          path={routes.createRegistration}
          component={CreateRegistrationPage}
        />
        <Route exact path="*">
          <Redirect to={routes.dashboard} />
        </Route>
      </Switch>
    </HashRouter>
  );
};

export default Router;

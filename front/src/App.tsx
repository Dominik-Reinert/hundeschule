import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { LoginPage } from "./pages/login_register_page";
import { PageBase } from "./page_base/page_base";

function App() {
  return (
    <PageBase>
      <BrowserRouter>
        <Switch>
          <Route path="/home">hello home!</Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </BrowserRouter>
    </PageBase>
  );
}

export default App;

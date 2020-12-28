import React from "react";
import { LoginPage } from "./pages/login_register_page";
import { PageBase } from "./page_base/page_base";

function App() {
  return (
    <PageBase>
      <LoginPage />
    </PageBase>
  );
}

export default App;

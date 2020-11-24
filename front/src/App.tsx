import React from "react";
import { FormComponent } from "./form/form_component";
import { PageBase } from "./page_base/page_base";

function App() {
  return (
    <PageBase>
      <FormComponent>
        <div>hello, world!</div>
      </FormComponent>
    </PageBase>
  );
}

export default App;

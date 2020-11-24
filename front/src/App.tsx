import React from "react";
import { ButtonComponent } from "./button/button_component";
import { FormComponent } from "./form/form_component";
import { PageBase } from "./page_base/page_base";
import { DescribedTextInput } from "./text_input/described_text_input";
import { TextInputComponent } from "./text_input/text_input_component";

enum CurrentStep {
  ENTRY = "ENTRY",
  CLUB = "CLUB",
  DATE = "DATE",
  COURSE_INSTRUCTOR = "COURSE_INSTRUCTOR",
}

function App() {
  const [currentStep, setCurrentStep] = React.useState(CurrentStep.ENTRY);
  return (
    <PageBase>
      <FormComponent>
        <ButtonComponent
          label={"Neue Prüfung erstellen"}
          onClick={() => setCurrentStep(CurrentStep.CLUB)}
        />
      </FormComponent>
      <FormComponent>
        <DescribedTextInput description={"hello:"} hint={"world"} />
        <ButtonComponent
          label={"Weiter"}
          onClick={() => setCurrentStep(CurrentStep.DATE)}
        />
      </FormComponent>
    </PageBase>
  );
}

export default App;

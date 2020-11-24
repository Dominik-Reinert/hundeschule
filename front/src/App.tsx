import React from "react";
import { ButtonComponent } from "./button/button_component";
import { FormComponent } from "./form/form_component";
import { PageBase } from "./page_base/page_base";
import { DescribedTextInput } from "./text_input/described_text_input";

enum CurrentStep {
  ENTRY = "ENTRY",
  CLUB = "CLUB",
  DATE = "DATE",
  COURSE_INSTRUCTOR = "COURSE_INSTRUCTOR",
  TESTER = "TESTER",
  CHAIRMAN = "CHAIRMAN",
  DONE = "DONE",
}

function App() {
  const [currentStep, setCurrentStep] = React.useState(CurrentStep.ENTRY);
  return (
    <PageBase>
      {currentStep === CurrentStep.ENTRY && (
        <FormComponent title="Willkommen!">
          <ButtonComponent
            label={"Neue Prüfung erstellen"}
            onClick={() => setCurrentStep(CurrentStep.CLUB)}
          />
        </FormComponent>
      )}
      {currentStep === CurrentStep.CLUB && (
        <FormComponent title="Angaben zum Verein">
          <DescribedTextInput description={"Landesverband:"} hint={"world"} />
          <DescribedTextInput description={"Kreisverband:"} hint={"world"} />
          <DescribedTextInput description={"Vereinsname:"} hint={"world"} />
          <ButtonComponent
            label={"Weiter"}
            onClick={() => setCurrentStep(CurrentStep.DATE)}
          />
        </FormComponent>
      )}
      {currentStep === CurrentStep.DATE && (
        <FormComponent title="Angaben zur Prüfung">
          <DescribedTextInput
            description={"Datum der Prüfung:"}
            hint={"world"}
          />
          <DescribedTextInput description={"Ort der Prüfung:"} hint={"world"} />
          <DescribedTextInput
            description={"Anzahl Teilnehmer:"}
            hint={"world"}
          />
          <ButtonComponent
            label={"Weiter"}
            onClick={() => setCurrentStep(CurrentStep.COURSE_INSTRUCTOR)}
          />
        </FormComponent>
      )}
      {currentStep === CurrentStep.COURSE_INSTRUCTOR && (
        <FormComponent title="Angaben zum Kursleiter">
          <DescribedTextInput description={"Name, Vorname:"} hint={"world"} />
          <DescribedTextInput description={"DVG Mitgl.-Nr.:"} hint={"world"} />
          <DescribedTextInput description={"Kursbeginn:"} hint={"world"} />
          <DescribedTextInput
            description={"PLZ/Ort des Kurses:"}
            hint={"world"}
          />
          <ButtonComponent
            label={"Weiter"}
            onClick={() => setCurrentStep(CurrentStep.TESTER)}
          />
        </FormComponent>
      )}
      {currentStep === CurrentStep.TESTER && (
        <FormComponent title="Angaben zum Prüfer">
          <DescribedTextInput description={"Name, Vorname:"} hint={"world"} />
          <DescribedTextInput description={"DVG Mitgl.-Nr.:"} hint={"world"} />
          <DescribedTextInput
            description={"Strasse, PLZ, Ort:"}
            hint={"world"}
          />
          <DescribedTextInput description={"Telefon, Fax:"} hint={"world"} />
          <DescribedTextInput description={"Mobil, E-mail:"} hint={"world"} />
          <ButtonComponent
            label={"Weiter"}
            onClick={() => setCurrentStep(CurrentStep.CHAIRMAN)}
          />
        </FormComponent>
      )}
      {currentStep === CurrentStep.CHAIRMAN && (
        <FormComponent title="Vereinsvorsitzender">
          <DescribedTextInput description={"Name, Vorname:"} hint={"world"} />
          <DescribedTextInput description={"DVG Mitgl.-Nr.:"} hint={"world"} />
          <DescribedTextInput
            description={"Strasse, PLZ, Ort:"}
            hint={"world"}
          />
          <ButtonComponent
            label={"Weiter"}
            onClick={() => setCurrentStep(CurrentStep.DONE)}
          />
        </FormComponent>
      )}
    </PageBase>
  );
}

export default App;

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
      <FormComponent title="Willkommen!">
        <ButtonComponent
          label={"Neue Prüfung erstellen"}
          onClick={() => setCurrentStep(CurrentStep.CLUB)}
        />
      </FormComponent>
      <FormComponent title="Angaben zum Verein">
        <DescribedTextInput description={"Landesverband:"} hint={"world"} />
        <DescribedTextInput description={"Kreisverband:"} hint={"world"} />
        <DescribedTextInput description={"Vereinsname:"} hint={"world"} />
        <ButtonComponent
          label={"Weiter"}
          onClick={() => setCurrentStep(CurrentStep.DATE)}
        />
      </FormComponent>
      <FormComponent title="Angaben zur Prüfung">
        <DescribedTextInput description={"Datum der Prüfung:"} hint={"world"} />
        <DescribedTextInput description={"Ort der Prüfung:"} hint={"world"} />
        <DescribedTextInput description={"Anzahl Teilnehmer:"} hint={"world"} />
        <ButtonComponent
          label={"Weiter"}
          onClick={() => setCurrentStep(CurrentStep.DATE)}
        />
      </FormComponent>
      <FormComponent title="Angaben zum Kursleiter">
        <DescribedTextInput description={"Name, Vorname:"} hint={"world"} />
        <DescribedTextInput description={"DVG Mitgl.-Nr.:"} hint={"world"} />
        <DescribedTextInput description={"Kursbeginn:"} hint={"world"} />
        <DescribedTextInput description={"PLZ/Ort des Kurses:"} hint={"world"} />
        <ButtonComponent
          label={"Weiter"}
          onClick={() => setCurrentStep(CurrentStep.DATE)}
        />
      </FormComponent>
      <FormComponent title="Angaben zum Prüfer">
        <DescribedTextInput description={"Name, Vorname:"} hint={"world"} />
        <DescribedTextInput description={"DVG Mitgl.-Nr.:"} hint={"world"} />
        <DescribedTextInput description={"Strasse, PLZ, Ort:"} hint={"world"} />
        <DescribedTextInput description={"Telefon, Fax:"} hint={"world"} />
        <DescribedTextInput description={"Mobil, E-mail:"} hint={"world"} />
        <ButtonComponent
          label={"Weiter"}
          onClick={() => setCurrentStep(CurrentStep.DATE)}
        />
      </FormComponent>
      <FormComponent title="Vereinsvorsitzender">
        <DescribedTextInput description={"Name, Vorname:"} hint={"world"} />
        <DescribedTextInput description={"DVG Mitgl.-Nr.:"} hint={"world"} />
        <DescribedTextInput description={"Strasse, PLZ, Ort:"} hint={"world"} />
        <ButtonComponent
          label={"Weiter"}
          onClick={() => setCurrentStep(CurrentStep.DATE)}
        />
      </FormComponent>
    </PageBase>
  );
}

export default App;

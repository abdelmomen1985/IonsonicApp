import React, { useState, useCallback, SyntheticEvent } from "react";
import {
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonInput,
  IonText,
} from "@ionic/react";
import { strings } from "../localization/localization";

export default function RegisterForm() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [marital, setMarital] = useState<number>();
  const doRegister = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      confirmPassword,
      phone,
      residencyId,
      birthDate,
      materialStatusId,
    } = e.target as any;
    console.log(name.value);
  }, []);
  return (
    <div>
      <form onSubmit={doRegister}>
        <h2 className="title ion-margin">{strings.user.register}</h2>
        <div className="reg-element">
          <IonInput
            type="text"
            name="name"
            className="reg-input"
            placeholder={strings.user.name}
          />
        </div>
        <div className="reg-element">
          <IonInput
            type="email"
            name="email"
            className="reg-input"
            placeholder={strings.user.email}
          />
        </div>

        <div className="reg-element">
          <IonInput
            type="password"
            name="password"
            className="reg-input"
            placeholder={strings.user.password}
          />
        </div>

        <div className="reg-element">
          <IonInput
            type="password"
            name="confirmPassword"
            className="reg-input"
            placeholder={strings.user.confirm_password}
          />
        </div>

        <div className="reg-element">
          <IonInput
            type="tel"
            name="phone"
            className="reg-input"
            placeholder={strings.user.phone}
          />
        </div>

        <div className="reg-element">
          <IonInput
            type="text"
            name="residencyId"
            className="reg-input"
            placeholder={strings.user.residency}
          />
        </div>
        <div className="reg-element">
          <IonDatetime
            displayFormat="DD-MM-YYYY"
            name="birthDate"
            placeholder={strings.user.birth_date}
            value={selectedDate}
            className="reg-input"
            onIonChange={(e) => setSelectedDate(e.detail.value!)}
          ></IonDatetime>
        </div>
        <div className="reg-element">
          <IonSelect
            value={marital}
            placeholder={strings.user.material_status}
            name="materialStatusId"
            className="reg-input"
            onIonChange={(e) => setMarital(e.detail.value)}
          >
            <IonSelectOption value="1">
              {strings.marital_statuses.single}
            </IonSelectOption>
            <IonSelectOption value="2">
              {strings.marital_statuses.marreid}
            </IonSelectOption>
          </IonSelect>
        </div>
        <div className="reg-element">
          <IonText color="light">{strings.user.accept}</IonText>
        </div>
        <div className="reg-element">
          <IonButton type="submit" expand="block" className="reg-btn">
            {strings.user.register}
          </IonButton>
        </div>
      </form>
    </div>
  );
}

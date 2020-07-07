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
import { UserType } from "../types/types";
import Axios from "axios";
import config from "../config";

export default function RegisterForm() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [maritalStatusId, setMaritalStatusId] = useState<number>();
  const doRegister = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    const {
      name,
      email,
      password,
      confirmPassword,
      materialStatusId,
      phone,
      birthDate,
      residencyId,
    } = e.target as any;

    // First Check Data

    const newUser = {
      FirstName: name.value,
      LastName: " ",
      Email: email.value,
      Password: password.value,
      Phone: phone.value,
      ResidencyId: residencyId.value,
      BirthDate: birthDate.value,
      MaterialStatusId: materialStatusId.value,
      CityId: 1,
    } as UserType;

    let resp = await Axios.post(
      `${config.API_URL}ManageCustomer/CreateCustomer`,
      newUser
    );
    console.log(newUser);
    let { Data } = resp.data;
    console.log(Data);
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
            value={birthDate}
            className="reg-input"
            onIonChange={(e) => setBirthDate(e.detail.value!)}
          ></IonDatetime>
        </div>
        <div className="reg-element">
          <IonSelect
            value={maritalStatusId}
            placeholder={strings.user.material_status}
            name="materialStatusId"
            className="reg-input"
            onIonChange={(e) => setMaritalStatusId(e.detail.value)}
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

import React, { useState, useCallback, SyntheticEvent, useEffect } from "react";
import {
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonInput,
  IonText,
  IonChip,
  IonIcon,
  IonLabel,
  IonToast,
} from "@ionic/react";
import { strings } from "../localization/localization";
import { UserType } from "../types/types";
import Axios from "axios";
import config from "../config";
import { alertCircleOutline } from "ionicons/icons";
import moment from "moment";
import { useHistory } from "react-router-dom";

export default function RegisterForm() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [maritalStatusId, setMaritalStatusId] = useState<number>();
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const history = useHistory();

  const doRegister = useCallback(
    async (e: SyntheticEvent) => {
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

      if (/\s/.test(password.value)) {
        console.log("contain_space", password.value);
        setValidationErrors({ contain_space: true });
        return;
      }

      if (confirmPassword.value !== password.value) {
        // First will remove old
        setValidationErrors({ mismatch: true });
        return;
      }

      if (!materialStatusId.value) {
        // First will remove old
        setValidationErrors({ should_select_marital_status: true });
        return;
      }

      if (!birthDate.value || moment(birthDate.value).year() > 2002) {
        setValidationErrors({ user_must_be_older_than_18_years: true });
        return;
      }

      console.log("Will Reg");
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

      if (Data.Status === 400 && Data.Message.Email) {
        setValidationErrors({ email_error: true });
        return;
      } else if (Data.Status === 200) {
        // Success Logic Goes here
        setShowSuccessToast(true);
      }
      console.log(Data);
    },
    [setShowSuccessToast]
  );
  return (
    <div>
      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => {
          setShowSuccessToast(false);
          history.push("/login");
        }}
        message={strings.login.register_done_successfuly}
        position="middle"
        duration={1200}
      />
      <form onSubmit={doRegister}>
        <h2 className="title ion-margin">{strings.user.register}</h2>
        <div className="reg-element">
          <IonInput
            type="text"
            name="name"
            required
            className="reg-input"
            placeholder={strings.user.name}
          />
        </div>
        <div className="reg-element">
          {validationErrors?.email_error && (
            <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
              <IonIcon icon={alertCircleOutline} />
              <IonLabel>{strings.login.email_error}</IonLabel>
            </IonChip>
          )}
          <IonInput
            type="email"
            name="email"
            required
            className="reg-input"
            placeholder={strings.user.email}
          />
        </div>

        <div className="reg-element">
          {validationErrors?.contain_space && (
            <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
              <IonIcon icon={alertCircleOutline} />
              <IonLabel>{strings.login.contain_space}</IonLabel>
            </IonChip>
          )}
          <IonInput
            type="password"
            name="password"
            required
            minlength={8}
            className="reg-input"
            placeholder={strings.user.password}
          />
        </div>

        <div className="reg-element">
          {validationErrors?.mismatch && (
            <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
              <IonIcon icon={alertCircleOutline} />
              <IonLabel>{strings.login.mismatch_password}</IonLabel>
            </IonChip>
          )}
          <IonInput
            type="password"
            name="confirmPassword"
            required
            minlength={8}
            className="reg-input"
            placeholder={strings.user.confirm_password}
          />
        </div>

        <div className="reg-element">
          <IonInput
            type="tel"
            name="phone"
            required
            min="8"
            className="reg-input"
            placeholder={strings.user.phone}
          />
        </div>

        <div className="reg-element">
          <IonInput
            type="text"
            name="residencyId"
            required
            min="5"
            className="reg-input"
            placeholder={strings.user.residency}
          />
        </div>
        <div className="reg-element">
          {validationErrors?.user_must_be_older_than_18_years && (
            <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
              <IonIcon icon={alertCircleOutline} />
              <IonLabel>
                {strings.login.user_must_be_older_than_18_years}
              </IonLabel>
            </IonChip>
          )}
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
          {validationErrors?.should_select_marital_status && (
            <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
              <IonIcon icon={alertCircleOutline} />
              <IonLabel>{strings.login.should_select_marital_status}</IonLabel>
            </IonChip>
          )}
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

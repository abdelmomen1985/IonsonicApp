import React, {
  useState,
  useCallback,
  SyntheticEvent,
  useContext,
  useEffect,
} from "react";
import {
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonInput,
  IonPage,
  IonContent,
} from "@ionic/react";
import { strings } from "../localization/localization";
import EveryHeader from "../components/EveryHeader";
import { AppCtxt } from "../Context";
import { useHistory } from "react-router";
import Footer from "../components/Footer";
import { UserType } from "../types/types";

export default function EditProfile() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [maritalStatusId, setMaritalStatusId] = useState<number>();
  const { currentLang, user } = useContext(AppCtxt);
  const doSave = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const { name, email, phone, residencyId } = e.target as any;
      const newUser = {
        Id: user.Id,
        Email: email.value,
        FirstName: name.value,
        LastName: "",
        Phone: phone.value,
        ResidencyId: residencyId.value,
        MaterialStatusId: maritalStatusId,
        BirthDate: birthDate,
      } as UserType;
      console.log(user, newUser);
    },
    [maritalStatusId, birthDate, user]
  );

  useEffect(() => {
    setBirthDate(user.BirthDate);
    setMaritalStatusId(+user.MaterialStatusId);
  }, [user]);

  const history = useHistory();

  return (
    <IonPage
      style={{
        direction: currentLang === "ar" ? "rtl" : "ltr",
      }}
    >
      <EveryHeader title={strings.user.edit_profile} backInstead={true} />
      <IonContent>
        <div style={{ marginTop: "5vh" }}>
          <form onSubmit={doSave}>
            <div className="reg-element">
              <IonInput
                type="text"
                name="name"
                value={user.FirstName + " " + user.LastName}
                className="reg-input"
                placeholder={strings.user.name}
              />
            </div>
            <div className="reg-element">
              <IonInput
                type="email"
                name="email"
                value={user.Email}
                className="reg-input"
                placeholder={strings.user.email}
              />
            </div>

            <div className="reg-element">
              <IonInput
                style={{ direction: "ltr" }}
                type="tel"
                name="phone"
                value={user.Phone}
                className="reg-input"
                placeholder={strings.user.phone}
              />
            </div>

            <div className="reg-element">
              <IonInput
                type="text"
                name="residencyId"
                value={user.ResidencyId}
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
                <IonSelectOption value={1}>
                  {strings.marital_statuses.single}
                </IonSelectOption>
                <IonSelectOption value={2}>
                  {strings.marital_statuses.marreid}
                </IonSelectOption>
              </IonSelect>
            </div>
            <div className="reg-element">
              <IonButton type="submit" expand="block" className="reg-btn">
                {strings.main.save}
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

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
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import { strings } from "../localization/localization";
import EveryHeader from "../components/EveryHeader";
import { AppCtxt } from "../Context";
import { useHistory } from "react-router";
import Footer from "../components/Footer";
import { UserType } from "../types/types";
import Axios from "axios";
import config from "../config";
import moment from "moment";
import { alertCircleOutline } from "ionicons/icons";

export default function EditProfile() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [maritalStatusId, setMaritalStatusId] = useState<number>();

  const [validationErrors, setValidationErrors] = useState<any>({});

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [residencyId, setResidencyId] = useState("");

  const { currentLang, user, setUserData } = useContext(AppCtxt);
  const history = useHistory();
  const doSave = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const { name, email, phone, residencyId } = e.target as any;
      const newUser = {
        ...user,
        Email: email.value,
        FirstName: name.value,
        LastName: "",
        Phone: phone.value,
        ResidencyId: residencyId.value,
        MaterialStatusId: maritalStatusId,
        BirthDate: birthDate,
      } as UserType;
      console.log(user, newUser);
      // Verify at first

      if (!birthDate || moment(birthDate).year() > 2002) {
        setValidationErrors({ user_must_be_older_than_18_years: true });
        return;
      }

      const formData = new FormData();
      formData.append("Id", "" + newUser.Id);
      formData.append("FirstName", newUser.FirstName);
      formData.append("LastName", " ");
      formData.append("BirthDate", newUser.BirthDate);
      formData.append("Phone", newUser.Phone);
      formData.append("Email", newUser.Email);
      formData.append("Password", "" + newUser.Password);
      formData.append("CityId", "" + newUser.CityId);
      formData.append("ResidencyId", newUser.ResidencyId);
      formData.append("MaterialStatusId", "" + newUser.MaterialStatusId);
      formData.append("Image", "" + newUser.ProfileImage);

      const resp = await Axios.post(
        `${config.API_URL}ManageCustomer/UpdateCustomer`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let { Data } = resp.data;
      if (Data && Data.Status === 200) {
        setUserData(Data.User);
        history.push("/profile");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [maritalStatusId, birthDate]
  );

  useEffect(() => {
    if (user) {
      setBirthDate(user.BirthDate);
      setMaritalStatusId(+user.MaterialStatusId);
      setName((user.FirstName + " " + user.LastName).trim());
      setEmail(user.Email);
      setPhone(user.Phone);
      setResidencyId(user.ResidencyId);
    }
  }, [user]);

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
                required
                value={name}
                onIonChange={(e) => setName(e.detail.value!)}
                className="reg-input"
                placeholder={strings.user.name}
              />
            </div>
            <div className="reg-element">
              <IonInput
                type="email"
                name="email"
                value={email}
                required
                onIonChange={(e) => setEmail(e.detail.value!)}
                className="reg-input"
                placeholder={strings.user.email}
              />
            </div>

            <div className="reg-element">
              <IonInput
                style={{ direction: "ltr" }}
                type="tel"
                name="phone"
                value={phone}
                onIonChange={(e) => setPhone(e.detail.value!)}
                className="reg-input"
                placeholder={strings.user.phone}
              />
            </div>

            <div className="reg-element">
              <IonInput
                type="text"
                name="residencyId"
                value={residencyId}
                required
                pattern="[0-9]{10}"
                onIonChange={(e) => setResidencyId(e.detail.value!)}
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

import React, { SyntheticEvent, useState } from "react";
import {
  IonPage,
  IonContent,
  IonInput,
  IonButton,
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import manaraLogo from "../images/manara_txt_logo.png";
import { strings } from "../localization/localization";
import config from "../config";
import { useHistory } from "react-router-dom";
import Axios from "axios";
import { alertCircleOutline } from "ionicons/icons";

export default function ForgotPassword() {
  const history = useHistory();
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    console.log(phone);
    let userCountry = localStorage.getItem("country");
    let countryCode = "";
    if (userCountry === "ksa") countryCode = "+966";
    else if (userCountry === "uae") countryCode = "+971";
    else if (userCountry === "eg") countryCode = "+20";

    let userPhone = phone;
    if (userPhone.length === 9 && userPhone.charAt(0) !== "0")
      userPhone = "0" + userPhone;
    // get only last 10 chars
    userPhone = userPhone.substr(-10);
    userPhone = countryCode + userPhone;

    let resp = await Axios.post(
      `${config.API_URL}ManageAccount/ForgetPassword`,
      {
        mobile: userPhone,
      }
    );

    let { Data } = resp.data;
    if (Data.Status === 200) {
      localStorage.removeItem("OTP_PHONE");
      localStorage.setItem("OTP_FORGOT", userPhone);
      history.push("/otp");
    } else {
      setError(strings.login.no_phone_error);
    }
    console.log(Data);
  };

  return (
    <IonPage>
      <IonContent className="login-bg">
        <div className="ion-text-center" style={{ marginTop: "5vh" }}>
          <img src={manaraLogo} alt="" />
        </div>
        <div style={{ marginTop: "18vh" }}>
          <h3 className="title ion-margin">{strings.login.title}</h3>
          <form onSubmit={handleSubmit}>
            <div className="reg-element">
              <IonInput
                type="tel"
                ref={(input) => input && input.focus()}
                onIonChange={(e) => setPhone(e.detail.value!)}
                name="phone"
                className="reg-input"
                placeholder={strings.user.phone}
              />
            </div>

            <div className="reg-element">
              <IonButton type="submit" expand="block" className="reg-btn">
                {strings.slider.next}
              </IonButton>
            </div>
          </form>
        </div>
        {error && (
          <div className="ion-text-center ion-margin-top">
            <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
              <IonIcon icon={alertCircleOutline} />
              <IonLabel>{error}</IonLabel>
            </IonChip>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
}

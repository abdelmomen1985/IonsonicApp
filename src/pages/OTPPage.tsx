import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
// @ts-ignore
import OtpInput from "react-otp-input";
import { strings } from "../localization/localization";
import Axios from "axios";
import config from "../config";
import { alertCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
//import ExploreContainer from "../components/ExploreContainer";

const OTPPage: React.FC = () => {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");

  const resendCode = async () => {
    if (phone)
      await Axios.post(`${config.API_URL}ManageAccount/ForgetPassword`, {
        mobile: phone,
      });
  };

  const doRegister = async (e: SyntheticEvent) => {
    e.preventDefault();

    let resp = await Axios.post(`${config.API_URL}ManageAccount/Verification`, {
      mobile: phone,
      code: otp,
    });
    let { Data } = resp.data;
    console.log(Data);

    if (Data.Status === 400) {
      setError(strings.main.verify_error);
      setOtp("");
      return;
    } else if (Data.Status === 200) {
      if (localStorage.getItem("OTP_PHONE")) {
        localStorage.removeItem("OTP_PHONE");
        history.push("/login");
      }
      if (localStorage.getItem("OTP_FORGOT")) {
        localStorage.setItem("UserEmail", Data.User.Email);
        history.push("/change_password");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("OTP_PHONE"))
      setPhone(localStorage.getItem("OTP_PHONE") + "");
    else if (localStorage.getItem("OTP_FORGOT"))
      setPhone(localStorage.getItem("OTP_FORGOT") + "");
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="dark" className="main-toolbar ion-text-center">
          <IonTitle>{strings.main.verify}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent id="main-content">
        <div className="ion-text-center ion-margin-top">
          <br />
        </div>
        <form onSubmit={doRegister}>
          <div className="ion-text-center ion-margin-top">
            <IonText
              style={{
                padding: ".5em",
                fontSize: "1.2em",
              }}
              color="dark"
            >
              {strings.main.verify_text}
            </IonText>
          </div>
          <div className="ion-text-center ion-margin-top">
            <IonText
              style={{
                padding: ".5em",
                backgroundColor: "#bbb",
                borderRadius: "6px",
                fontWeight: "bold",
              }}
            >
              {phone}
            </IonText>
          </div>
          <div className="ion-text-center ion-margin-top">
            <br />
          </div>
          <div className="ion-text-center ion-margin-top">
            <IonText>{strings.main.verify_enter}</IonText>
          </div>
          <div className="ion-text-center ion-margin-top">
            <OtpInput
              inputStyle="inputStyle"
              containerStyle={{ justifyContent: "center" }}
              value={otp}
              onChange={(val: any) => {
                console.log(val);
                setOtp(val);
              }}
              isInputNum={true}
              numInputs={4}
              separator={<span></span>}
            />
          </div>
          <div className="ion-text-center ion-margin-top">
            <br />
          </div>
          <div className="reg-element ion-margin-top">
            <IonButton type="submit" expand="block" className="reg-btn">
              {strings.user.register}
            </IonButton>
          </div>
        </form>

        {error && (
          <div className="ion-text-center ion-margin-top">
            <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
              <IonIcon icon={alertCircleOutline} />
              <IonLabel>{error}</IonLabel>
            </IonChip>
          </div>
        )}

        <div className="ion-text-center ion-margin-top">
          <IonText
            color="dark"
            style={{ fontSize: "1.1em" }}
            onClick={resendCode}
          >
            {strings.login.resend_code}
          </IonText>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default OTPPage;

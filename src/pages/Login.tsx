import React, {
  SyntheticEvent,
  useCallback,
  useState,
  useContext,
} from "react";
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
import { bugy } from "../utils/functions";
import { alertCircleOutline } from "ionicons/icons";
import { AppCtxt } from "../Context";

export default function Login() {
  const [loginError, setLoginError] = useState<string>("");
  const history = useHistory();
  const { setUserData } = useContext(AppCtxt);

  // TODO don't use useCallback [later]
  // TODO or use Route Rendering (Conditional Rendering) [later]
  const handleSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    const goHome = () => {
      let user = JSON.parse(localStorage.getItem("UserData")!);
      setUserData(user);
      JSON.parse(localStorage.getItem("UserData")!);
      history.push("/user_home");
    };
    const { email, password } = e.target as any;
    /*
      const headers = {
        "Content-Type": "application/json",
      };
      let resp = await axios.post(
        `${config.API_URL}ManageAccount/Login`,
        {
          email: email.value,
          password: password.value,
        },
        { headers }
      );
      
      let first = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllOffers?PageIndex=1&LanguageId=1&PageSize=100`
      );
      let { Data } = await first.json();
      console.log(Data);
      */

    Axios.post(
      `${config.PROXY_POST}ManageAccount/Login`,
      {
        email: email.value,
        password: password.value,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((resp) => {
        let { Data } = resp.data;
        if (Data && Data.Status === 200) {
          localStorage.setItem("UserData", JSON.stringify(Data.User));
          goHome();
        } else if (Data.Status === 400) {
          // Show error
          console.error("Login Error");
          setLoginError(Data.Message);
        }
      })
      .catch((error) => {
        bugy(error);
      });
  }, []);

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
                type="email"
                ref={(input) => input && input.focus()}
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
              {loginError && (
                <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
                  <IonIcon icon={alertCircleOutline} />
                  <IonLabel>{loginError}</IonLabel>
                </IonChip>
              )}
            </div>

            <div className="reg-element">
              <IonButton type="submit" expand="block" className="reg-btn">
                {strings.login.title}
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}

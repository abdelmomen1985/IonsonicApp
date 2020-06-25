import React, { useEffect } from "react";
import { IonPage, IonContent, IonButton, IonRouterLink } from "@ionic/react";
import manaraLogo from "../images/manara_txt_logo.png";
import { strings } from "../localization/localization";
import { useHistory } from "react-router-dom";
export default function Welcome() {
  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem("UserData")) {
      console.log("user data found");
      history.push("/user_home");
    }
  }, [history]);

  return (
    <IonPage>
      <IonContent className="login-bg">
        <div className="ion-text-center" style={{ marginTop: "5vh" }}>
          <img src={manaraLogo} alt="" />
        </div>

        <div style={{ marginTop: "45vh" }}>
          <div className="reg-element">
            <IonButton
              color="light"
              type="button"
              expand="block"
              className="reg-btn"
              routerLink="/login"
            >
              {strings.login.already_a_member}
            </IonButton>
            <div className="divider"></div>
            <IonRouterLink
              color="light"
              className="ion-margin"
              routerLink="/register"
            >
              {strings.login.register_text}
            </IonRouterLink>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}

import React, { useEffect, useContext } from "react";
import {
  IonContent,
  IonMenuToggle,
  IonButton,
  IonText,
  IonTitle,
  IonPage,
} from "@ionic/react";
import avatarImg from "../images/avatar.png";
import menuIcon from "../images/left_menu.png";
import cardIcon from "../images/card_icon.png";

import { strings } from "../localization/localization";
import Footer from "../components/Footer";
import { useHistory } from "react-router";
import { AppCtxt } from "../Context";

export default function UserHome() {
  const { currentLang } = useContext(AppCtxt);
  const history = useHistory();
  useEffect(() => {
    // Check if user logged in
    if (!localStorage.getItem("UserData")) {
      console.log("user data found");
      history.push("/");
    }
  }, [history]);

  // TODO flex directio row reverse
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <IonContent id="main-content" className="user-home-bg">
        <div className="top-bg">
          <div className="top-nav">
            <div>
              <IonMenuToggle>
                <img src={menuIcon} alt="" />
              </IonMenuToggle>
            </div>

            <div>
              <img src={cardIcon} alt="" />
            </div>
          </div>
        </div>

        <div className="ion-text-center user-avatar">
          <div>
            <IonText color="light">First</IonText>
          </div>
          <div className="user_profile_img">
            <img src={avatarImg} alt="" style={{ maxWidth: "140%" }} />
          </div>
        </div>
        <div className="ion-text-center">
          <IonText color="medium">{strings.watts.available}</IonText>
          <IonTitle
            color="tertiary"
            style={{ fontSize: "1.7em", fontWeight: "bold" }}
          >
            16 Watts
          </IonTitle>
        </div>
        <div className="divider-dark"></div>
        <div>
          <div className="reg-element">
            <IonButton
              type="button"
              expand="block"
              color="light"
              size="large"
              className="light-btn"
            >
              الكوبونات
            </IonButton>
          </div>
          <div className="reg-element">
            <IonButton
              type="button"
              expand="block"
              color="light"
              size="large"
              className="light-btn"
            >
              التحويلات
            </IonButton>
          </div>
        </div>
      </IonContent>
      <Footer current="user_home" />
    </IonPage>
  );
}

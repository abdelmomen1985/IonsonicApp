import React, { useContext } from "react";
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
import { AppCtxt } from "../Context";

export default function UserHome() {
  const { currentLang, user } = useContext(AppCtxt);

  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      {user?.Id && (
        <IonContent className="user-home-bg">
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
              {user?.ProfileImage ? (
                <img
                  src={user.ProfileImage}
                  alt=""
                  style={{ maxWidth: "140%" }}
                />
              ) : (
                <img src={avatarImg} alt="" style={{ maxWidth: "140%" }} />
              )}
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
                routerLink="/transactions"
              >
                {strings.main.my_transactions}
              </IonButton>
            </div>
            <div className="reg-element">
              <IonButton
                type="button"
                expand="block"
                color="light"
                size="large"
                className="light-btn"
                routerLink="/redeem_ctg"
              >
                {strings.main.av_gifts_vouchers}
              </IonButton>
            </div>
            <div className="reg-element">
              <IonButton
                type="button"
                expand="block"
                color="light"
                size="large"
                className="light-btn"
                routerLink="/offers"
              >
                {strings.offers.title}
              </IonButton>
            </div>
          </div>
        </IonContent>
      )}
      <Footer current="user_home" />
    </IonPage>
  );
}

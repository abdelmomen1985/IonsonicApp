import React, { useState, useEffect, useContext } from "react";
import config from "../config";
import {
  IonPage,
  IonContent,
  IonMenuToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonCard,
  IonIcon,
  IonButtons,
  IonText,
} from "@ionic/react";
import Footer from "../components/Footer";

import menuIcon from "../images/left_menu.png";
import { cardOutline } from "ionicons/icons";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";

export default function Offers() {
  const { currentLang } = useContext(AppCtxt);
  useEffect(() => {}, []);

  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <IonHeader>
        <IonToolbar color="dark" className="main-toolbar">
          <IonButtons slot="start">
            <IonMenuToggle>
              <img src={menuIcon} alt="" />
            </IonMenuToggle>
          </IonButtons>
          <IonButtons slot="end">
            <IonIcon slot="icon-only" icon={cardOutline} color="light" />
          </IonButtons>
          <IonTitle> {strings.main.notifications} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="notifications-home-bg"></IonContent>
      <Footer current="notifications" />
    </IonPage>
  );
}

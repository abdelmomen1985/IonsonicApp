import React, { useEffect, useContext } from "react";
import {
  IonPage,
  IonContent,
  IonMenuToggle,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonIcon,
  IonButtons,
} from "@ionic/react";
import Footer from "../components/Footer";

import menuIcon from "../images/left_menu.png";
import { cardOutline, alertCircleOutline } from "ionicons/icons";
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
      <IonContent className="notifications-home-bg">
        <div className="ion-margin ">
          <p style={{ padding: "1em", fontSize: "1.3em" }}>
            <IonIcon color="primary" icon={alertCircleOutline} />
            {strings.main.no_notifications}
          </p>
        </div>
      </IonContent>
      <Footer current="notifications" />
    </IonPage>
  );
}

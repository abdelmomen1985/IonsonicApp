import React, { useContext } from "react";
import { IonPage, IonButton, IonIcon, IonLabel } from "@ionic/react";
import { AppCtxt } from "../../Context";
import EveryHeader from "../../components/EveryHeader";
import { strings } from "../../localization/localization";
import manaraLogo from "../../images/manara_logo.png";
import Footer from "../../components/Footer";
import {
  callOutline,
  helpCircleOutline,
  alertCircleOutline,
} from "ionicons/icons";

export default function ContactUs() {
  const { currentLang } = useContext(AppCtxt);
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={strings.menu.contact} />
      <div className="ion-text-center" style={{ marginTop: "5vh" }}>
        <img src={manaraLogo} alt="" />
      </div>
      <div style={{ marginTop: "10vh", height: "100%" }}>
        <div className="reg-element">
          <IonButton
            onClick={() => {
              // Show modal
            }}
            type="button"
            expand="block"
            color="light"
            size="large"
            className="light-btn"
          >
            <IonIcon slot="start" icon={helpCircleOutline} color="primary" />
            <IonLabel>{strings.main.inquery}</IonLabel>
          </IonButton>
        </div>
        <div className="reg-element">
          <IonButton
            onClick={() => {
              // Show modal
            }}
            type="button"
            expand="block"
            color="light"
            size="large"
            className="light-btn"
          >
            <IonIcon slot="start" icon={alertCircleOutline} color="primary" />
            <IonLabel>{strings.main.complaint}</IonLabel>
          </IonButton>
        </div>
        <div className="reg-element">
          <IonButton
            onClick={() => {
              // Show modal
            }}
            type="button"
            expand="block"
            color="light"
            size="large"
            className="light-btn"
          >
            <IonIcon slot="start" icon={callOutline} color="primary" />
            <IonLabel>{strings.main.speak}</IonLabel>
          </IonButton>
        </div>
      </div>
      <Footer current="" />
    </IonPage>
  );
}

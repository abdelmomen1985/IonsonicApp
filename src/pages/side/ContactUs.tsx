import React, { useContext, useState } from "react";
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
import ContactModal from "../../components/ContactModal";
import CallUsModal from "../../components/CallUsModal";

export default function ContactUs() {
  const { currentLang } = useContext(AppCtxt);
  const [contactTypeId, setContactTypeId] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const [callUsModalOpen, setCallUsModalOpen] = useState(false);
  return (
    <>
      <ContactModal
        contactTypeId={contactTypeId}
        onSubmit={() => {}}
        open={modalOpen}
        onToggModal={(open) => {
          setModalOpen(open);
        }}
      />
      <CallUsModal
        open={callUsModalOpen}
        onToggModal={(open) => {
          setCallUsModalOpen(open);
        }}
      />
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
                setContactTypeId(1);
                setModalOpen(true);
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
                setContactTypeId(2);
                setModalOpen(true);
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
                setCallUsModalOpen(true);
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
    </>
  );
}

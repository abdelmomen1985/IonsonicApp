import React, { useContext } from "react";
import { IonPage, IonContent } from "@ionic/react";
import Footer from "../components/Footer";
import { AppCtxt } from "../Context";
import { strings } from "../localization/localization";
import { RouteComponentProps } from "react-router";
import EveryHeader from "../components/EveryHeader";

export default function RedeemItems({ match }: RouteComponentProps) {
  const { currentLang } = useContext(AppCtxt);
  const { what } = match.params as any;
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={strings.offers.redeem} />
      {/**
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
          <IonTitle> {strings.offers.redeem} </IonTitle>
        </IonToolbar>
      </IonHeader>
 */}
      <IonContent className="redeem-ctg-bg">{what}</IonContent>
      <Footer current="redeem_ctg" />
    </IonPage>
  );
}

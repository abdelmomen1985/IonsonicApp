import React, { useContext } from "react";
import { IonPage, IonContent, IonCard, IonCardTitle } from "@ionic/react";
import { AppCtxt } from "../Context";
import { strings } from "../localization/localization";
import Footer from "../components/Footer";
import panasonic from "../images/panasonic.png";
import gifts from "../images/gifts.png";
import vouchers from "../images/vouchers.png";
import EveryHeader from "../components/EveryHeader";

export default function RedeemCtg() {
  const { currentLang } = useContext(AppCtxt);
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      {/*
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
      <EveryHeader title={strings.offers.redeem} />
      <IonContent className="redeem-ctg-bg">
        <IonCard className="ion-text-center" routerLink="/redeem/p_products">
          <img src={panasonic} alt="" style={{ maxWidth: "65%" }} />
          <IonCardTitle style={{ paddingBottom: ".5em" }} color="tertiary">
            {strings.main.panasonic_products}
          </IonCardTitle>
        </IonCard>

        <IonCard className="ion-text-center" routerLink="/redeem/gifts">
          <img
            src={gifts}
            alt=""
            style={{ maxWidth: "80%", marginTop: ".5em" }}
          />
          <IonCardTitle style={{ paddingBottom: ".5em" }} color="tertiary">
            {strings.main.gifts}
          </IonCardTitle>
        </IonCard>

        <IonCard className="ion-text-center" routerLink="/redeem/vouchers">
          <img
            src={vouchers}
            alt=""
            style={{ maxWidth: "80%", marginTop: ".5em" }}
          />
          <IonCardTitle style={{ paddingBottom: ".5em" }} color="tertiary">
            {strings.main.vouchers}
          </IonCardTitle>
        </IonCard>
      </IonContent>
      <Footer current="redeem_ctg" />
    </IonPage>
  );
}

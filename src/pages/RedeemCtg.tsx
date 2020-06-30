import React, { useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonIcon,
  IonTitle,
  IonContent,
  IonCard,
  IonCardTitle,
} from "@ionic/react";
import { AppCtxt } from "../Context";
import { cardOutline } from "ionicons/icons";
import { strings } from "../localization/localization";
import menuIcon from "../images/left_menu.png";
import Footer from "../components/Footer";
import panasonic from "../images/panasonic.png";
import gifts from "../images/gifts.png";
import vouchers from "../images/vouchers.png";

export default function RedeemCtg() {
  const { currentLang } = useContext(AppCtxt);
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
          <IonTitle> {strings.offers.redeem} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="redeem-ctg-bg">
        <IonCard className="ion-text-center" routerLink="/redeem/panasonic">
          <img src={panasonic} alt="" style={{ maxWidth: "65%" }} />
          <IonCardTitle style={{ paddingBottom: ".5em" }} color="tertiary">
            Panasonic Products
          </IonCardTitle>
        </IonCard>

        <IonCard className="ion-text-center" routerLink="/redeem/gifts">
          <img
            src={gifts}
            alt=""
            style={{ maxWidth: "80%", marginTop: ".5em" }}
          />
          <IonCardTitle style={{ paddingBottom: ".5em" }} color="tertiary">
            Gifts{" "}
          </IonCardTitle>
        </IonCard>

        <IonCard className="ion-text-center" routerLink="/redeem/vouchers">
          <img
            src={vouchers}
            alt=""
            style={{ maxWidth: "80%", marginTop: ".5em" }}
          />
          <IonCardTitle style={{ paddingBottom: ".5em" }} color="tertiary">
            Vouchers
          </IonCardTitle>
        </IonCard>
      </IonContent>
      <Footer current="redeem_ctg" />
    </IonPage>
  );
}

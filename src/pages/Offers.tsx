import React, { useState, useEffect, useContext } from "react";
import config from "../config";
import {
  IonPage,
  IonContent,
  IonButton,
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
import { OfferType } from "../types/types";
import menuIcon from "../images/left_menu.png";
import { cardOutline } from "ionicons/icons";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";
export default function Offers() {
  const [offers, setOffers] = useState<OfferType[]>([]);
  const { currentLang } = useContext(AppCtxt);

  useEffect(() => {
    console.log(currentLang);
    const fetchData = async () => {
      let resp = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllOffers?PageIndex=1&LanguageId=1&PageSize=100`
      );
      let { Data } = await resp.json();
      setOffers(Data?.offers);
    };

    fetchData();
  }, []);

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
          <IonTitle> {strings.offers.title} </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="offers-home-bg" id="main-content">
        {offers &&
          offers.map((offer) => (
            <IonCard key={offer.Id}>
              <div style={{ padding: ".5em", textAlign: "left" }}>
                <IonText>{offer.ProductionDate}</IonText>
              </div>

              <img src={offer.Image} alt="" />
            </IonCard>
          ))}
      </IonContent>
      <Footer current="offers" />
    </IonPage>
  );
}

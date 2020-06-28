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
import { OfferType } from "../types/types";
import menuIcon from "../images/left_menu.png";
import { cardOutline, giftOutline } from "ionicons/icons";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";
import moment from "moment";
import { bugy } from "../utils/functions";

export default function Offers() {
  const [offers, setOffers] = useState<OfferType[]>([]);
  const { currentLang } = useContext(AppCtxt);

  useEffect(() => {
    const fetchData = async () => {
      bugy(currentLang);
      const langId = (config as any).LANG_CODES[currentLang as string].id;
      let resp = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllOffers?PageIndex=1&LanguageId=${langId}&PageSize=100`
      );
      let { Data } = await resp.json();
      setOffers(Data?.offers);
    };

    fetchData();
  }, [currentLang]);

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
      <IonContent className="offers-home-bg">
        {offers &&
          offers.map((offer) => (
            <IonCard key={offer.Id}>
              <div style={{ padding: ".5em", textAlign: "left" }}>
                <IonText>
                  {strings.offers.production_date}:{" "}
                  {moment(offer.ProductionDate).format("YYYY/MM/DD")}
                </IonText>
                <br />
                <IonText>{offer.Description}</IonText>
              </div>

              <img src={offer.Image} alt="" />
              <IonTitle>
                {strings.offers.model} . {offer.Model}
              </IonTitle>
              <div className="divider-dark"></div>
              <IonTitle
                className="ion-margin"
                color="tertiary"
                style={{ textAlign: "right" }}
              >
                <IonIcon icon={giftOutline} color="tertiary" />
                {strings.offers.you_will_get} {offer.PriceWithDiscount}{" "}
                {strings.watts.title}
              </IonTitle>
            </IonCard>
          ))}
      </IonContent>
      <Footer current="offers" />
    </IonPage>
  );
}

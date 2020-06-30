import React, { useEffect, useContext, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import Footer from "../components/Footer";

import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";
import { NewsType } from "../types/types";
import config from "../config";
import EveryHeader from "../components/EveryHeader";

export default function NewsAndTips() {
  const { currentLang } = useContext(AppCtxt);

  const [news, setNews] = useState<NewsType[]>([]);
  useEffect(() => {
    setNews(config.fakeAPI.news as NewsType[]);
  }, []);

  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
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
          <IonTitle>{strings.menu.tips}</IonTitle>
        </IonToolbar>
      </IonHeader>
      */}
      <EveryHeader title={strings.menu.tips} />
      <IonContent className="notifications-home-bg ion-padding">
        {news.map((single) => (
          <IonCard className="ion-margin" key={single.Id}>
            <img src={single.Images[0].Image} alt="" />
            <IonCardTitle className="ion-padding">
              {single.TitleAr}
            </IonCardTitle>
            <IonCardContent>{single.DescAr}</IonCardContent>
          </IonCard>
        ))}
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

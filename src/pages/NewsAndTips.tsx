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
import Axios from "axios";
import { getLangId } from "../utils/functions";

export default function NewsAndTips() {
  const { currentLang } = useContext(AppCtxt);

  const [news, setNews] = useState<NewsType[]>([]);
  useEffect(() => {
    const getNews = async () => {
      const langId = getLangId(currentLang!);
      let resp = await Axios.get(
        `${config.API_URL}ManageCustomer/GetAllNews?LanguageId=${langId}&CountryId=0`
      );
      const { Data } = resp.data;

      if (Data && resp.status === 200) {
        console.log(Data);
        setNews(Data);
      }
    };
    getNews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            {single.NewsImages?.length > 0 && (
              <img
                src={single.NewsImages[single.NewsImages.length - 1].Image}
                alt=""
              />
            )}
            <IonCardTitle className="ion-padding">
              {currentLang === "ar" ? single.TitleAr : single.TitleEn}
            </IonCardTitle>
            <IonCardContent>
              {currentLang === "ar" ? single.DescAr : single.DescEn}
            </IonCardContent>
          </IonCard>
        ))}
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

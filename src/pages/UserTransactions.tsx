import React, { useContext } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
} from "@ionic/react";
import EveryHeader from "../components/EveryHeader";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";

export default function UserTransactions() {
  const { currentLang } = useContext(AppCtxt);
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={strings.main.my_transactions} />
      <IonContent>
        <IonCard>
          <IonCardHeader color="tertiary"> 0 Watts</IonCardHeader>
          <IonCardSubtitle class="ion-padding"> 2018/06/02 </IonCardSubtitle>
          <IonCardContent>اسم الصنف</IonCardContent>
        </IonCard>
        <IonCard>
          <IonCardHeader color="tertiary"> 16 Watts</IonCardHeader>
          <IonCardSubtitle class="ion-padding"> 2018/07/02 </IonCardSubtitle>
          <IonCardContent>اسم الصنف</IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}

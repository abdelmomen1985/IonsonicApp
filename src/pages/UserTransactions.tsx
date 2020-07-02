import React, { useContext } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonText,
} from "@ionic/react";
import EveryHeader from "../components/EveryHeader";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";
import Footer from "../components/Footer";

export default function UserTransactions() {
  const { currentLang } = useContext(AppCtxt);
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={strings.main.my_transactions} />
      <IonContent>
        <IonCard>
          <IonCardHeader color="tertiary">
            <IonText className="c-head-text" color="light">
              + 10 {strings.watts.title}
            </IonText>
          </IonCardHeader>
          <IonCardSubtitle class="ion-padding"> 2018/06/02 </IonCardSubtitle>
          <IonCardContent>اسم الصنف</IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader color="danger">
            <IonText className="c-head-text" color="light">
              - 16 {strings.watts.title}
            </IonText>
          </IonCardHeader>
          <IonCardSubtitle class="ion-padding"> 2018/07/02 </IonCardSubtitle>
          <IonCardContent>{strings.main.redeem}</IonCardContent>
        </IonCard>

        <IonCard>
          <IonCardHeader color="tertiary">
            <IonText className="c-head-text" color="light">
              + 16 {strings.watts.title}
            </IonText>
          </IonCardHeader>
          <IonCardSubtitle class="ion-padding"> 2018/07/02 </IonCardSubtitle>
          <IonCardContent>اسم الصنف</IonCardContent>
        </IonCard>
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

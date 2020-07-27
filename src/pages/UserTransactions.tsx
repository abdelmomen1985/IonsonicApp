import React, { useContext } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonText,
  IonCardSubtitle,
  IonCardContent,
  IonIcon,
} from "@ionic/react";
import EveryHeader from "../components/EveryHeader";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";
import Footer from "../components/Footer";
import config from "../config";
import Axios from "axios";
import { UserTransType } from "../types/types";
import { addCircleOutline, removeCircleOutline } from "ionicons/icons";

export default function UserTransactions() {
  const { currentLang, user } = useContext(AppCtxt);
  const [userTransactions, setUserTransactions] = React.useState<
    UserTransType[]
  >([]);

  React.useEffect(() => {
    const getUserTrans = async () => {
      let resp = await Axios.get(
        `${config.API_URL}ManageCustomer/CustomerPointsTransactions?CustId=${user?.Id}`
      );
      const { Data } = resp.data;

      if (Data && resp.status === 200) {
        console.log(Data);
        setUserTransactions(Data);
      }
    };
    if (user?.Id) getUserTrans();
  }, [user]);

  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={strings.main.my_transactions} />
      <IonContent>
        {userTransactions.map((trans, index) => (
          <IonCard key={index}>
            <IonCardHeader color={trans.TypeId === "2" ? "danger" : "tertiary"}>
              <IonIcon
                icon={
                  trans.TypeId === "2" ? removeCircleOutline : addCircleOutline
                }
                color="light"
                style={{ fontSize: "1.4em" }}
              />
              <span>&nbsp;</span>
              <IonText className="c-head-text " color="light">
                {trans.PointCount} {strings.watts.title}
              </IonText>
            </IonCardHeader>
            <IonCardSubtitle class="ion-padding">{trans.Date}</IonCardSubtitle>
            <IonCardSubtitle class="ion-padding" style={{ direction: "ltr" }}>
              {trans.ActionId}
            </IonCardSubtitle>
          </IonCard>
        ))}
        {/** 
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
        */}
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

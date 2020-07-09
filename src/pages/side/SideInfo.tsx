import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonSpinner,
  IonList,
  IonItem,
  IonLabel,
  IonText,
} from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { strings } from "../../localization/localization";
import EveryHeader from "../../components/EveryHeader";
import { AppCtxt } from "../../Context";
import { Plugins } from "@capacitor/core";
import Footer from "../../components/Footer";
import { getLangId } from "../../utils/functions";
import config from "../../config";
const { Device } = Plugins;

interface SideInfoProps {
  title: string;
}
export default function SideInfo({ match }: RouteComponentProps) {
  const { currentLang, appData, setAppData } = useContext(AppCtxt);

  const [deviceInfo, setDeviceInfo] = useState<any>({});
  const [infoString, setInfoString] = useState("");
  const menuStrings = (strings as any).menu;
  const title = match.path.replace("/", "");
  useEffect(() => {
    const getDeviceInfo = async () => {
      const info = await Device.getInfo();
      console.log(info);
      setDeviceInfo(info);
    };
    const fetchy = async () => {
      // get lang
      const langId = getLangId(currentLang!);

      let resp = await fetch(
        `${config.ORIG_URL}ManageGeneralData/GetAllGeneralData?LanguageId=${langId}&CountryId=0`
      );
      let { Data } = await resp.json();
      setAppData(Data);
    };
    if (!appData) {
      fetchy();
    }

    if (title === "help") getDeviceInfo();
    else if (title === "privacy") {
      setInfoString("" + appData?.Privacy);
    } else if (title === "terms") {
      setInfoString("" + appData?.TermAndConditions);
    } else if (title === "how") {
      setInfoString("" + appData?.HowItWork);
    }
  }, [title, appData, setAppData, currentLang]);

  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={menuStrings[title]} />
      <IonContent>
        {title === "help" && (
          <IonList style={{ direction: "ltr" }}>
            <IonItem>
              <IonLabel>Platform</IonLabel>
              <IonText>{deviceInfo.platform}</IonText>
            </IonItem>

            <IonItem>
              <IonLabel>appVersion</IonLabel>
              <IonText>{deviceInfo.appVersion}</IonText>
            </IonItem>

            <IonItem>
              <IonLabel>operatingSystem</IonLabel>
              <IonText>{deviceInfo.operatingSystem}</IonText>
            </IonItem>

            <IonItem>
              <IonLabel>uuid</IonLabel>
              <IonText>{deviceInfo.uuid}</IonText>
            </IonItem>
          </IonList>
        )}
        {infoString && <p className="ion-padding ">{infoString}</p>}
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

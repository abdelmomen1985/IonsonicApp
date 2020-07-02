import React, { useContext, useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
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

  const [deviceInfo, setDeviceInfo] = useState({});
  const [infoString, SetInfoString] = useState("");
  const menuStrings = (strings as any).menu;
  const title = match.path.replace("/", "");
  useEffect(() => {
    const getDeviceInfo = async () => {
      const info = await Device.getInfo();
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
      SetInfoString("" + appData?.Privacy);
    } else if (title === "terms") {
      SetInfoString("" + appData?.TermAndConditions);
    } else if (title === "how") {
      SetInfoString("" + appData?.HowItWork);
    }
  }, [title, appData, setAppData, currentLang]);

  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={menuStrings[title]} />
      <IonContent>
        {title === "help" && (
          <pre style={{ maxWidth: "100%" }} dir="ltr">
            {JSON.stringify(deviceInfo, null, 2)}
          </pre>
        )}
        {infoString && <p className="ion-padding ">{infoString}</p>}
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

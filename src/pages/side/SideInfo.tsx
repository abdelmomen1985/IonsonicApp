import React, { useContext, useEffect, useState } from "react";
import { IonPage, IonContent } from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { strings } from "../../localization/localization";
import EveryHeader from "../../components/EveryHeader";
import { AppCtxt } from "../../Context";
import { Plugins } from "@capacitor/core";
import Footer from "../../components/Footer";
const { Device } = Plugins;

interface SideInfoProps {
  title: string;
}
export default function SideInfo({ match }: RouteComponentProps) {
  const { currentLang } = useContext(AppCtxt);

  const [deviceInfo, setDeviceInfo] = useState({});
  const menuStrings = (strings as any).menu;
  const title = match.path.replace("/", "");
  useEffect(() => {
    const getDeviceInfo = async () => {
      const info = await Device.getInfo();
      setDeviceInfo(info);
    };
    if (title === "help") getDeviceInfo();
  }, [title]);
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={menuStrings[title]} />
      <IonContent>
        {title === "help" && (
          <pre style={{ maxWidth: "100%" }} dir="ltr">
            {JSON.stringify(deviceInfo, null, 2)}
          </pre>
        )}
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

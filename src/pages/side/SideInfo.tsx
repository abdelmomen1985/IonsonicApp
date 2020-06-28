import React, { useContext } from "react";
import { IonPage } from "@ionic/react";
import { RouteComponentProps } from "react-router-dom";
import { strings } from "../../localization/localization";
import EveryHeader from "../../components/EveryHeader";
import { AppCtxt } from "../../Context";

interface SideInfoProps {
  title: string;
}
export default function SideInfo({ match }: RouteComponentProps) {
  const { currentLang } = useContext(AppCtxt);
  const menuStrings = (strings as any).menu;
  const title = match.path.replace("/", "");
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={menuStrings[title]} />
    </IonPage>
  );
}

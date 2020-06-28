import React, { useContext } from "react";
import { IonPage } from "@ionic/react";
import { AppCtxt } from "../../Context";
import EveryHeader from "../../components/EveryHeader";
import { strings } from "../../localization/localization";

export default function ContactUs() {
  const { currentLang } = useContext(AppCtxt);
  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={strings.menu.contact} />
    </IonPage>
  );
}

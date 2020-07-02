import React, { useState, useEffect, useContext } from "react";
import { IonModal, IonButton, IonChip, IonIcon, IonLabel } from "@ionic/react";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";
import { getLangId } from "../utils/functions";
import config from "../config";
import { callOutline, atCircleOutline, compassOutline } from "ionicons/icons";
import manaraLogo from "../images/manara_logo.png";
interface CallUsModalProps {
  onToggModal: (open: boolean) => void; // Give parent full control
  open: boolean;
}

export default function CallUsModal({ onToggModal, open }: CallUsModalProps) {
  const [inOpen, setInOpen] = useState(open);

  const { currentLang, appData, setAppData } = useContext(AppCtxt);

  useEffect(() => {
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
  }, [appData, setAppData, currentLang]);

  useEffect(() => {
    setInOpen(open);
  }, [open]);

  return (
    <IonModal isOpen={inOpen} cssClass="custom-modal contact-modal">
      <div style={{ marginTop: "20vh" }} className="ion-text-center">
        <div className="ion-text-center">
          <img src={manaraLogo} alt="" />
        </div>

        <IonChip
          style={{ fontSize: "1.2em", marginTop: "5vh" }}
          className="ion-margin"
        >
          <IonIcon icon={callOutline} color="tertiary" />
          <IonLabel>{appData?.ContactUs.Phone}</IonLabel>
        </IonChip>
        <IonChip style={{ fontSize: "1.2em" }} className="ion-margin">
          <IonIcon icon={atCircleOutline} color="tertiary" />
          <IonLabel>{appData?.ContactUs.Email}</IonLabel>
        </IonChip>
        <IonChip style={{ fontSize: "1.2em" }} className="ion-margin">
          <IonIcon icon={compassOutline} color="tertiary" />
          <IonLabel>{appData?.ContactUs.Address}</IonLabel>
        </IonChip>
      </div>
      <IonButton onClick={() => onToggModal(false)}>
        {strings.main.close}
      </IonButton>
    </IonModal>
  );
}

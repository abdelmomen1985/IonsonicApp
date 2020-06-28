import React, { useState, useEffect } from "react";
import {
  IonModal,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonButton,
} from "@ionic/react";

import indiaLogo from "../images/flags/india.png";
import ukLogo from "../images/flags/uk.png";
import pakistanLogo from "../images/flags/pakistan.png";
import bangLogo from "../images/flags/bang.png";
import ksaLogo from "../images/flags/ksa.png";

interface SelectLangModalProps {
  onSelectLang: (lang: string) => void;
  onToggModal: (open: boolean) => void; // Give parent full control
  open: boolean;
}

export default function SelectLangModal({
  onSelectLang,
  onToggModal,
  open,
}: SelectLangModalProps) {
  const [inOpen, setInOpen] = useState(open);

  useEffect(() => {
    setInOpen(open);
  }, [open]);

  return (
    <IonModal isOpen={inOpen} cssClass="custom-modal modal-lang">
      <IonList>
        <IonItem
          onClick={() => {
            onSelectLang("ar");
          }}
        >
          <IonAvatar slot="start">
            <IonImg src={ksaLogo} />
          </IonAvatar>
          <IonLabel>
            <h2>Arabic</h2>
          </IonLabel>
        </IonItem>

        <IonItem
          onClick={() => {
            onSelectLang("en");
          }}
        >
          <IonAvatar slot="start">
            <IonImg src={ukLogo} />
          </IonAvatar>
          <IonLabel>
            <h2>English</h2>
          </IonLabel>
        </IonItem>

        <IonItem
          onClick={() => {
            onSelectLang("hi");
          }}
        >
          <IonAvatar slot="start">
            <IonImg src={indiaLogo} />
          </IonAvatar>
          <IonLabel>
            <h2>Indian</h2>
          </IonLabel>
        </IonItem>

        <IonItem
          onClick={() => {
            onSelectLang("ur");
          }}
        >
          <IonAvatar slot="start">
            <IonImg src={pakistanLogo} />
          </IonAvatar>
          <IonLabel>
            <h2>Urdu</h2>
          </IonLabel>
        </IonItem>

        <IonItem
          onClick={() => {
            onSelectLang("bn");
          }}
        >
          <IonAvatar slot="start">
            <IonImg src={bangLogo} />
          </IonAvatar>
          <IonLabel>
            <h2>Bengali</h2>
          </IonLabel>
        </IonItem>
      </IonList>

      <IonButton onClick={() => onToggModal(false)}>Close</IonButton>
    </IonModal>
  );
}

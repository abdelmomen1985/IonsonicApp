import React from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { cardOutline } from "ionicons/icons";

import menuIcon from "../images/left_menu.png";

interface EveryHeaderProps {
  title: string;
}

export default function EveryHeader({ title }: EveryHeaderProps) {
  return (
    <IonHeader>
      <IonToolbar color="dark" className="main-toolbar">
        <IonButtons slot="start">
          <IonMenuToggle>
            <img src={menuIcon} alt="" />
          </IonMenuToggle>
        </IonButtons>
        <IonButtons slot="end">
          {/** No need for now 
          <IonIcon slot="icon-only" icon={cardOutline} color="light" />
          */}
        </IonButtons>
        <IonTitle> {title} </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

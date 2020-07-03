import React, { useContext, ReactChild, ReactChildren } from "react";
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { arrowBackSharp, arrowForwardSharp } from "ionicons/icons";

import menuIcon from "../images/left_menu.png";
import { AppCtxt } from "../Context";
import { useHistory } from "react-router-dom";

interface EveryHeaderProps {
  title: string;
  backInstead?: boolean;
  children?: ReactChild | ReactChildren;
}

export default function EveryHeader({
  title,
  backInstead,
  children,
}: EveryHeaderProps) {
  const { currentLang } = useContext(AppCtxt);
  const history = useHistory();
  return (
    <IonHeader>
      <IonToolbar color="dark" className="main-toolbar">
        <IonButtons slot="start">
          {backInstead ? (
            <IonIcon
              icon={currentLang === "ar" ? arrowForwardSharp : arrowBackSharp}
              style={{ fontSize: "1.2em" }}
              onClick={() => {
                history.goBack();
              }}
            />
          ) : (
            <IonMenuToggle>
              <img src={menuIcon} alt="" />
            </IonMenuToggle>
          )}
        </IonButtons>
        <IonButtons slot="end">
          {/** No need for now 
          <IonIcon slot="icon-only" icon={cardOutline} color="light" />
          */}
          {children && children}
        </IonButtons>
        <IonTitle> {title} </IonTitle>
      </IonToolbar>
    </IonHeader>
  );
}

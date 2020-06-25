import React from "react";
import {
  IonFooter,
  IonToolbar,
  IonButtons,
  IonIcon,
  IonButton,
} from "@ionic/react";
import {
  personCircleOutline,
  notificationsOutline,
  locationOutline,
  starOutline,
  giftOutline,
} from "ionicons/icons";

interface FooterProps {
  current: string;
}

export default function Footer({ current }: FooterProps) {
  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons className="footer-btns">
          <IonButton routerLink="/user_home">
            <IonIcon
              slot="icon-only"
              icon={personCircleOutline}
              color={current === "user_home" ? "tertiary" : "medium"}
            />
          </IonButton>
          <IonIcon
            slot="icon-only"
            icon={notificationsOutline}
            color="medium"
          />
          <IonIcon slot="icon-only" icon={giftOutline} color="medium" />
          <IonIcon slot="icon-only" icon={locationOutline} color="medium" />
          <IonButton routerLink="/offers">
            <IonIcon
              slot="icon-only"
              icon={starOutline}
              color={current === "offers" ? "tertiary" : "medium"}
            />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
}

import React, { useContext } from "react";
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
import { AppCtxt } from "../Context";

interface FooterProps {
  current: string;
}

export default function Footer({ current }: FooterProps) {
  const { user } = useContext(AppCtxt);
  return (
    <>
      {user?.Id && (
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
              <IonButton routerLink="/notifications">
                <IonIcon
                  slot="icon-only"
                  icon={notificationsOutline}
                  color={current === "notifications" ? "tertiary" : "medium"}
                />
              </IonButton>
              <IonButton routerLink="/redeem_ctg">
                <IonIcon
                  slot="icon-only"
                  icon={giftOutline}
                  color={current === "redeem_ctg" ? "tertiary" : "medium"}
                />
              </IonButton>
              <IonButton routerLink="/branches">
                <IonIcon
                  color={current === "branches" ? "tertiary" : "medium"}
                  slot="icon-only"
                  icon={locationOutline}
                />
              </IonButton>
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
      )}
    </>
  );
}

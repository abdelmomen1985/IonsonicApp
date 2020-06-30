import React, { useContext } from "react";
import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle,
} from "@ionic/react";
import {
  logOutOutline,
  settingsOutline,
  callOutline,
  helpBuoyOutline,
  documentTextOutline,
  personCircleOutline,
  trailSignOutline,
  homeOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";

interface AppMenuProps {
  lang: string;
}
export default function AppMenu({ lang }: AppMenuProps) {
  const history = useHistory();
  const { user } = useContext(AppCtxt);
  return (
    <IonMenu
      side={lang === "ar" ? "end" : "start"}
      menuId="first"
      contentId="main-content"
    >
      <IonHeader>
        <IonToolbar color="tertiary" className="menu-toolbar">
          <IonTitle>{""}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonMenuToggle>
          <IonList>
            {!user.Id && (
              <IonItem routerLink="/" routerDirection="root">
                <IonIcon slot="start" icon={homeOutline} color="dark" />
                <IonLabel>{strings.main.home}</IonLabel>
              </IonItem>
            )}
            {user?.Id && (
              <>
                <IonItem routerLink="/user_home" routerDirection="root">
                  <IonIcon slot="start" icon={homeOutline} color="dark" />
                  <IonLabel>{strings.main.home}</IonLabel>
                </IonItem>

                <IonItem routerLink="/profile" routerDirection="root">
                  <IonIcon
                    slot="start"
                    icon={personCircleOutline}
                    color="dark"
                  />
                  <IonLabel>{strings.menu.profile}</IonLabel>
                </IonItem>
                <IonItem routerLink="/settings">
                  <IonIcon slot="start" icon={settingsOutline} color="dark" />
                  <IonLabel>{strings.menu.settings}</IonLabel>
                </IonItem>
              </>
            )}
            <IonItem routerLink="/tips">
              <IonIcon slot="start" icon={trailSignOutline} color="dark" />
              <IonLabel>{strings.menu.tips}</IonLabel>
            </IonItem>
            <IonItem routerLink="/contact_us">
              <IonIcon slot="start" icon={callOutline} color="dark" />
              <IonLabel>{strings.menu.contact}</IonLabel>
            </IonItem>
            <IonItem routerLink="/help">
              <IonIcon slot="start" icon={helpBuoyOutline} color="dark" />
              <IonLabel>{strings.menu.help}</IonLabel>
            </IonItem>
            <IonItem routerLink="/terms">
              <IonIcon slot="start" icon={documentTextOutline} color="dark" />
              <IonLabel>{strings.menu.terms}</IonLabel>
            </IonItem>
            <IonItem routerLink="/privacy">
              <IonIcon slot="start" icon={documentTextOutline} color="dark" />
              <IonLabel>{strings.menu.privacy}</IonLabel>
            </IonItem>
            {user?.Id && (
              <IonItem
                onClick={() => {
                  // Log out and clear localStorage
                  localStorage.clear();
                  history.push("/");
                  window.location.reload(false);
                }}
              >
                <IonIcon slot="start" icon={logOutOutline} color="dark" />
                <IonLabel>{strings.menu.logout}</IonLabel>
              </IonItem>
            )}
          </IonList>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
}

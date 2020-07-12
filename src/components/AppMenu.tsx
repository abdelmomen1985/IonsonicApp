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
  informationCircleOutline,
  trainOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";

interface AppMenuProps {
  lang: string;
}

export default function AppMenu({ lang }: AppMenuProps) {
  const history = useHistory();
  const { user, setUserData } = useContext(AppCtxt);
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
      <IonContent style={{ direction: lang === "ar" ? "rtl" : "ltr" }}>
        <IonMenuToggle>
          <IonList>
            {!user?.Id && (
              <IonItem routerLink="/" routerDirection="root">
                <IonIcon slot="start" icon={homeOutline} color="tertiary" />
                <IonLabel>{strings.main.home}</IonLabel>
              </IonItem>
            )}
            {user?.Id && (
              <>
                <IonItem routerLink="/user_home" routerDirection="root">
                  <IonIcon slot="start" icon={homeOutline} color="tertiary" />
                  <IonLabel>{strings.main.home}</IonLabel>
                </IonItem>

                <IonItem routerLink="/profile" routerDirection="root">
                  <IonIcon
                    slot="start"
                    icon={personCircleOutline}
                    color="tertiary"
                  />
                  <IonLabel>{strings.menu.profile}</IonLabel>
                </IonItem>
                <IonItem routerLink="/settings">
                  <IonIcon
                    slot="start"
                    icon={settingsOutline}
                    color="tertiary"
                  />
                  <IonLabel>{strings.menu.settings}</IonLabel>
                </IonItem>
              </>
            )}
            <IonItem routerLink="/tips">
              <IonIcon slot="start" icon={trailSignOutline} color="tertiary" />
              <IonLabel>{strings.menu.tips}</IonLabel>
            </IonItem>
            <IonItem routerLink="/contact_us">
              <IonIcon slot="start" icon={callOutline} color="tertiary" />
              <IonLabel>{strings.menu.contact}</IonLabel>
            </IonItem>

            <IonItem routerLink="/terms">
              <IonIcon
                slot="start"
                icon={informationCircleOutline}
                color="tertiary"
              />
              <IonLabel>{strings.menu.terms}</IonLabel>
            </IonItem>
            <IonItem routerLink="/how">
              <IonIcon slot="start" icon={trainOutline} color="tertiary" />
              <IonLabel>{strings.menu.how}</IonLabel>
            </IonItem>
            <IonItem routerLink="/privacy">
              <IonIcon
                slot="start"
                icon={documentTextOutline}
                color="tertiary"
              />
              <IonLabel>{strings.menu.privacy}</IonLabel>
            </IonItem>

            {user?.Id && (
              <IonItem
                onClick={() => {
                  // Log out and clear localStorage
                  setUserData(null);
                  localStorage.clear();
                  history.replace("/");
                  // window.location.reload(false);
                }}
              >
                <IonIcon slot="start" icon={logOutOutline} color="tertiary" />
                <IonLabel>{strings.menu.logout}</IonLabel>
              </IonItem>
            )}

            <IonItem routerLink="/help">
              <IonIcon slot="start" icon={helpBuoyOutline} color="tertiary" />
              <IonLabel>{strings.menu.help}</IonLabel>
            </IonItem>
          </IonList>
        </IonMenuToggle>
      </IonContent>
    </IonMenu>
  );
}

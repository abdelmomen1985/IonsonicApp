import React from "react";
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
} from "@ionic/react";
import {
  logOutOutline,
  settingsOutline,
  callOutline,
  helpBuoyOutline,
  documentTextOutline,
  personCircleOutline,
  trailSignOutline,
} from "ionicons/icons";
import { useHistory } from "react-router-dom";

interface AppMenuProps {
  lang: string;
}
export default function AppMenu({ lang }: AppMenuProps) {
  const history = useHistory();
  return (
    <IonMenu
      side={lang === "ar" ? "end" : "start"}
      menuId="first"
      contentId="main-content"
    >
      <IonHeader>
        <IonToolbar color="tertiary" className="menu-toolbar">
          <IonTitle>Start Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem onClick={() => {}}>
            {" "}
            <IonIcon slot="start" icon={personCircleOutline} color="dark" />
            Menu Item
          </IonItem>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" icon={settingsOutline} color="dark" /> Menu
            Item
          </IonItem>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" icon={trailSignOutline} color="dark" /> Menu
            Item
          </IonItem>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" icon={callOutline} color="dark" /> Menu Item
          </IonItem>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" icon={helpBuoyOutline} color="dark" /> Menu
            Item
          </IonItem>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" icon={documentTextOutline} color="dark" />{" "}
            Menu Item
          </IonItem>
          <IonItem onClick={() => {}}>
            <IonIcon slot="start" icon={documentTextOutline} color="dark" />{" "}
            Menu Item
          </IonItem>
          <IonItem
            onClick={() => {
              // Log out and clear localStorage
              localStorage.clear();
              history.push("/");
              //window.location.reload();
            }}
          >
            <IonIcon slot="start" icon={logOutOutline} color="dark" />
            <IonLabel>Log out</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

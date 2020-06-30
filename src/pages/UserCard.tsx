import React, { useContext } from "react";
import { IonPage, IonContent, IonText } from "@ionic/react";
import { AppCtxt } from "../Context";
import Footer from "../components/Footer";
import EveryHeader from "../components/EveryHeader";
import goldenCard from "../images/cards/golden_card.png";
import logoDetails from "../images/logo_details.png";
export default function UserCard() {
  const { currentLang, user } = useContext(AppCtxt);
  return (
    <IonPage
      style={{
        direction: currentLang === "ar" ? "rtl" : "ltr",
      }}
    >
      <EveryHeader title="" />
      <IonContent className="ion-text-center user-card-bg ">
        <div
          className="card card-box "
          style={{
            background: `url(${goldenCard}) no-repeat center center / cover`,
            borderRadius: "12px",
            marginTop: "10vh",
          }}
        >
          <div
            className="ion-text-center "
            style={{ display: "block", paddingTop: "1em", maxWidth: "100%" }}
          >
            <img src={logoDetails} alt="" style={{ maxWidth: "100%" }} />
          </div>
          <img
            className="barcode"
            src={"https://i.imgur.com/pyPn113.jpg"}
            alt=""
            style={{ width: "100%", maxHeight: "70px" }}
          />
          <div className="ion-padding-bottom">
            <IonText color="light" style={{ fontSize: "larger" }}>
              {user.FirstName} {user.LastName}
            </IonText>
          </div>
          <div></div>
        </div>
      </IonContent>
      <Footer current="" />
    </IonPage>
  );
}

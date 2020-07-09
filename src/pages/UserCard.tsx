import React, { useContext } from "react";
import { IonPage, IonContent, IonText } from "@ionic/react";
import { AppCtxt } from "../Context";
import Footer from "../components/Footer";
import EveryHeader from "../components/EveryHeader";
import goldCard from "../images/cards/gold_card.png";
import blueCard from "../images/cards/blue_card.png";
import silverCard from "../images/cards/silver_card.png";
import platinumCard from "../images/cards/platinum_card.png";
import logoDetails from "../images/logo_details.png";
export default function UserCard() {
  const { currentLang, user } = useContext(AppCtxt);
  const imageSwitch = (type: string) => {
    if (type === "blue") return `url(${blueCard})`;
    else if (type === "silver") return `url(${silverCard})`;
    else if (type === "gold") return `url(${goldCard})`;
    else if (type === "platinum") return `url(${platinumCard})`;
  };

  return (
    <IonPage
      style={{
        direction: currentLang === "ar" ? "rtl" : "ltr",
      }}
    >
      <EveryHeader title="" />
      <IonContent
        className="user-card-bg "
        style={{
          direction: "ltr",
        }}
      >
        <div
          className="card card-box ion-padding-top "
          style={{
            background: `url(${goldCard}) no-repeat center center / cover`,
            backgroundImage: imageSwitch(user.type),
            borderRadius: "12px",
            marginTop: "10vh",
          }}
        >
          <IonText
            className="ion-padding"
            color="light"
            style={{ fontSize: "1.2em", textTransform: "capitalize" }}
          >
            {user.type}
          </IonText>
          <div
            className="ion-text-center "
            style={{ display: "block", maxWidth: "100%" }}
          >
            <img
              className="ion-margin-top"
              src={logoDetails}
              alt=""
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div
            className="ion-margin-top ion-text-center"
            style={{
              backgroundColor: "white",
              height: "60px",
              overflow: "hidden",
            }}
          >
            <img
              className="barcode ion-text-center"
              src={`https://barcode.tec-it.com/barcode.ashx?data=pana000${user.Id}`}
              alt=""
              style={{ width: "90%", maxHeight: "70px" }}
            />
          </div>
          <div
            style={{
              backgroundColor: "white",
              height: "10px",
            }}
          ></div>

          <div className="ion-padding-bottom ion-margin-top ion-text-center">
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

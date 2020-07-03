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
            <img
              className="ion-margin-top"
              src={logoDetails}
              alt=""
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div
            className="ion-margin-top"
            style={{
              backgroundColor: "white",
              height: "60px",
              overflow: "hidden",
            }}
          >
            <img
              className="barcode"
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

          <div className="ion-padding-bottom ion-margin-top">
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

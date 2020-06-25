import React, { useState, useEffect } from "react";
import {
  IonSelect,
  IonSelectOption,
  IonButton,
  IonModal,
  IonList,
  IonItem,
  IonAvatar,
  IonLabel,
  IonImg,
} from "@ionic/react";
import manaraLogo from "../images/manara_logo.png";
import ksaLogo from "../images/flags/ksa.png";
import indiaLogo from "../images/flags/india.png";
import ukLogo from "../images/flags/uk.png";
import pakistanLogo from "../images/flags/pakistan.png";
import bangLogo from "../images/flags/bang.png";
import uaeLogo from "../images/flags/uae.png";
import egyptLogo from "../images/flags/egypt.png";
import { useHistory } from "react-router-dom";

export default function LandingSelect() {
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("UserData")) {
      console.log("user data found");
      history.push("/slider");
    }
  }, [history]);

  const [selectedLang, setSelectedLang] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [showModalLang, setShowModalLang] = useState(false);
  const [showModalCountry, setShowModalCountry] = useState(false);

  const selectLang = (lang: string) => {
    setSelectedLang(lang);
    setShowModalLang(false);
  };

  const selectCountry = (country: string) => {
    setSelectedCountry(country);
    setShowModalCountry(false);
  };

  return (
    <>
      {" "}
      <IonModal isOpen={showModalLang} cssClass="custom-modal modal-lang">
        <IonList>
          <IonItem
            onClick={() => {
              selectLang("ar");
            }}
          >
            <IonAvatar slot="start">
              <IonImg src={ksaLogo} />
            </IonAvatar>
            <IonLabel>
              <h2>Arabic</h2>
            </IonLabel>
          </IonItem>

          <IonItem
            onClick={() => {
              selectLang("en");
            }}
          >
            <IonAvatar slot="start">
              <IonImg src={ukLogo} />
            </IonAvatar>
            <IonLabel>
              <h2>English</h2>
            </IonLabel>
          </IonItem>

          <IonItem
            onClick={() => {
              selectLang("hi");
            }}
          >
            <IonAvatar slot="start">
              <IonImg src={indiaLogo} />
            </IonAvatar>
            <IonLabel>
              <h2>Indian</h2>
            </IonLabel>
          </IonItem>

          <IonItem
            onClick={() => {
              selectLang("ur");
            }}
          >
            <IonAvatar slot="start">
              <IonImg src={pakistanLogo} />
            </IonAvatar>
            <IonLabel>
              <h2>Urdu</h2>
            </IonLabel>
          </IonItem>

          <IonItem
            onClick={() => {
              selectLang("bn");
            }}
          >
            <IonAvatar slot="start">
              <IonImg src={bangLogo} />
            </IonAvatar>
            <IonLabel>
              <h2>Bengali</h2>
            </IonLabel>
          </IonItem>
        </IonList>

        <IonButton onClick={() => setShowModalLang(false)}>Close</IonButton>
      </IonModal>
      <IonModal isOpen={showModalCountry} cssClass="custom-modal modal-country">
        <IonList>
          <IonItem
            onClick={() => {
              selectCountry("ksa");
            }}
          >
            <IonAvatar slot="start">
              <IonImg src={ksaLogo} />
            </IonAvatar>
            <IonLabel>
              <h2> Kingdom of Saudi Arabia</h2>
            </IonLabel>
          </IonItem>

          <IonItem
            onClick={() => {
              selectCountry("uae");
            }}
          >
            <IonAvatar slot="start">
              <IonImg src={uaeLogo} />
            </IonAvatar>
            <IonLabel>
              <h2> United Arab Emirates </h2>
            </IonLabel>
          </IonItem>

          <IonItem
            onClick={() => {
              selectCountry("eg");
            }}
          >
            <IonAvatar slot="start">
              <IonImg src={egyptLogo} />
            </IonAvatar>
            <IonLabel>
              <h2> Arab Republic of Egypt </h2>
            </IonLabel>
          </IonItem>
        </IonList>
        <IonButton onClick={() => setShowModalCountry(false)}>Close</IonButton>
      </IonModal>
      <div className="land-bg">
        {/* 
        <div className="reg-element">
          <IonSelect
            value={gender}
            placeholder="الحالة الاجتماعية"
            className="reg-input"
            onIonChange={(e) => setGender(e.detail.value)}
          >
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="male">Male</IonSelectOption>
          </IonSelect>
        </div>
        */}
        <div className="ion-text-center" style={{ marginTop: "5vh" }}>
          <img src={manaraLogo} alt="" />
        </div>

        <div className="reg-element" style={{ marginTop: "40vh" }}>
          <IonButton
            onClick={() => setShowModalLang(true)}
            size="large"
            expand="full"
            className="reg-input land-btn"
            fill="clear"
          >
            {selectedLang ? selectedLang : "Select Your Language"}
          </IonButton>
        </div>

        <div className="reg-element">
          <IonButton
            onClick={() => setShowModalCountry(true)}
            size="large"
            expand="full"
            className="reg-input land-btn"
            fill="clear"
          >
            {selectedCountry ? selectedCountry : "Select Your Country"}
          </IonButton>
        </div>

        <div className="reg-element">
          <IonButton
            type="button"
            expand="block"
            className="reg-btn"
            onClick={() => {
              // save lang and country to local storage and go to next page (sliders)
              localStorage.setItem("lang", selectedLang);
              localStorage.setItem("country", selectedCountry);
              history.push("/slider");
            }}
          >
            GET STARTED
          </IonButton>
        </div>
      </div>
    </>
  );
}

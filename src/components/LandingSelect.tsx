import React, { useState, useContext } from "react";
import {
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
import uaeLogo from "../images/flags/uae.png";
import egyptLogo from "../images/flags/egypt.png";
import { useHistory } from "react-router-dom";
import { strings } from "../localization/localization";
import SelectLangModal from "./SelectLangModal";
import { AppCtxt } from "../Context";

export default function LandingSelect() {
  const history = useHistory();
  const { setCurrentLang } = useContext(AppCtxt);

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
      <SelectLangModal
        onSelectLang={selectLang}
        open={showModalLang}
        onToggModal={(open) => {
          setShowModalLang(open);
        }}
      />
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
              if (selectedLang && selectedCountry) {
                // save lang and country to local storage and go to next page (sliders)
                localStorage.setItem("lang", selectedLang);
                setCurrentLang(selectedLang);
                // change strings lang
                strings.setLanguage(selectedLang);
                localStorage.setItem("country", selectedCountry);
                localStorage.removeItem("AppData");
                history.push("/slider");
              }
            }}
          >
            GET STARTED
          </IonButton>
        </div>
      </div>
    </>
  );
}

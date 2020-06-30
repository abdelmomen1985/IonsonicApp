import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonMenuToggle,
  IonIcon,
  IonTitle,
  IonContent,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { arrowBackOutline, locationSharp } from "ionicons/icons";
import { strings } from "../localization/localization";
import Footer from "../components/Footer";

import menuIcon from "../images/left_menu.png";
import { AppCtxt } from "../Context";
import { AreaType } from "../types/types";
import config from "../config";
import { useHistory } from "react-router-dom";

export default function BranchesMap() {
  const history = useHistory();
  const { currentLang } = useContext(AppCtxt);
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<number>(0);
  useEffect(() => {
    const getAllAreas = async () => {
      const langId = (config as any).LANG_CODES[currentLang as string].id;
      let resp = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllAreas?LanguageId=${langId}`
      );
      let { Data: areas } = await resp.json();
      setAreas(areas);
    };
    getAllAreas();
  }, [currentLang]);
  return (
    <>
      <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
        <IonContent className="branches-bg">
          <div className="top-bg">
            <div className="top-nav">
              <div>
                <IonMenuToggle>
                  <img src={menuIcon} alt="" />
                </IonMenuToggle>
              </div>
              {/* No back btn
              <div>
                <IonIcon
                  slot="icon-only"
                  icon={arrowBackOutline}
                  color="light"
                  style={{ fontSize: "1.5em" }}
                />
              </div>
              */}
            </div>
          </div>
          <div className="ion-text-center user-avatar">
            <div className="avatar-img" style={{ border: "none" }}>
              <IonIcon
                slot="icon-only"
                style={{ fontSize: "3.5em" }}
                icon={locationSharp}
                color="dark"
              />
            </div>
          </div>
          {areas && (
            <div style={{ marginTop: "10vh" }} className="reg-element">
              <IonSelect
                value={selectedBranchId}
                placeholder={strings.main.choose_area}
                className="reg-input"
                onIonChange={(e) => {
                  setSelectedBranchId(e.detail.value);
                  history.push("/area_map/" + e.detail.value);
                }}
              >
                {areas.map((area) => (
                  <IonSelectOption key={area.Id} value={area.Id}>
                    {area.Name}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </div>
          )}
        </IonContent>
        <Footer current="branches" />
      </IonPage>
    </>
  );
}

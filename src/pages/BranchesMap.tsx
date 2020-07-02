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
import { bugy } from "../utils/functions";

export default function BranchesMap() {
  const history = useHistory();
  const { currentLang } = useContext(AppCtxt);
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState(0);

  useEffect(() => {
    const getAllAreas = async () => {
      const langId = (config as any).LANG_CODES[currentLang as string].id;
      let resp = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllAreas?LanguageId=${langId}`
      );
      let { Data: areas } = await resp.json();
      setAreas(areas);
      if (localStorage.getItem("CityId")) {
        const cityId = localStorage.getItem("CityId") + "";
        setSelectedAreaId(+cityId);
      }
    };
    getAllAreas();
  }, [currentLang]);

  return (
    <>
      <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
        <IonContent className="areas-bg">
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
                value={selectedAreaId}
                placeholder={strings.main.choose_area}
                className="reg-input"
                onIonChange={(e) => {
                  const cityId = e.detail.value;
                  bugy(cityId);
                  localStorage.setItem("CityId", cityId);
                  const selectedArea = (areas as AreaType[]).filter(
                    (area) => area.Id === cityId
                  )[0];
                  localStorage.setItem("CityName", selectedArea?.Name);
                  history.push("/area_map/" + cityId);
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
          {localStorage.getItem("cityId") + "*"}
          {localStorage.getItem("cityName")}
        </IonContent>
        <Footer current="branches" />
      </IonPage>
    </>
  );
}

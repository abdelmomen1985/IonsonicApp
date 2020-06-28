import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonMenuToggle,
  IonIcon,
  IonContent,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { strings } from "../localization/localization";
import Footer from "../components/Footer";

import { AppCtxt } from "../Context";
import { AreaType } from "../types/types";
import config from "../config";
import EveryHeader from "../components/EveryHeader";
import { RouteComponentProps } from "react-router-dom";

export default function SingleMap({ match }: RouteComponentProps) {
  const { currentLang } = useContext(AppCtxt);
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState(0);
  useEffect(() => {
    const getAllAreas = async () => {
      const langId = (config as any).LANG_CODES[currentLang as string].id;
      let resp = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllAreas?LanguageId=${langId}`
      );
      let { Data: areas } = await resp.json();
      setAreas(areas);
      setSelectedBranchId(+(match.params as any).areaId);
    };
    getAllAreas();
  }, [currentLang, match.params]);
  // TODO: Add map [later]
  return (
    <>
      <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
        <EveryHeader title="" />
        <IonContent className="area-map-bg">
          {areas && (
            <div style={{ marginTop: "0px" }} className="reg-element">
              <IonSelect
                value={selectedBranchId}
                className="reg-input"
                onIonChange={(e) => {
                  setSelectedBranchId(e.detail.value);
                }}
              >
                {areas.map((area) => (
                  <IonSelectOption value={area.Id}>{area.Name}</IonSelectOption>
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

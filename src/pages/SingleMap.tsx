import React, { useContext, useEffect, useState } from "react";
import { IonPage, IonContent, IonSelect, IonSelectOption } from "@ionic/react";

import Footer from "../components/Footer";

import { AppCtxt } from "../Context";
import { AreaType } from "../types/types";
import config from "../config";
import EveryHeader from "../components/EveryHeader";
import { RouteComponentProps } from "react-router-dom";
import MapContainer from "../components/MapContainer";

export default function SingleMap({ match }: RouteComponentProps) {
  const { currentLang } = useContext(AppCtxt);
  const [areas, setAreas] = useState<AreaType[]>([]);
  const [selectedAreaId, setSelectedAreaId] = useState(0);
  const [selectedArea, setSelectedArea] = useState<AreaType | null>(null);
  useEffect(() => {
    const getAllAreas = async () => {
      const langId = (config as any).LANG_CODES[currentLang as string].id;
      let resp = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllAreas?LanguageId=${langId}`
      );
      let { Data: areas } = await resp.json();
      setAreas(areas);
      setSelectedAreaId(+(match.params as any).areaId);
    };
    getAllAreas();
  }, [currentLang, match.params]);

  useEffect(() => {
    // filter selectedArea
    const selectedArea = (areas as AreaType[]).filter(
      (area) => area.Id === selectedAreaId
    )[0];
    setSelectedArea(selectedArea);
  }, [selectedAreaId, areas]);

  return (
    <>
      <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
        <EveryHeader title="" />
        <IonContent className="area-map-bg">
          {areas && (
            <div style={{ marginTop: "0px" }} className="reg-element">
              <IonSelect
                value={selectedAreaId}
                className="reg-input"
                onIonChange={(e) => {
                  setSelectedAreaId(e.detail.value);
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
          {selectedArea && (
            <MapContainer
              center={{
                lat: selectedArea?.Latitude!,
                lng: selectedArea?.Longitude!,
              }}
            />
          )}
        </IonContent>
        <Footer current="branches" />
      </IonPage>
    </>
  );
}

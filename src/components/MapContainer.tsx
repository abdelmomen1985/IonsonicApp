import React, { useState, useEffect, useContext } from "react";

import { Map, Marker, GoogleApiWrapper } from "google-maps-react";
import config from "../config";
import { getLangId } from "../utils/functions";
import { AppCtxt } from "../Context";
import { BranchType } from "../types/types";
import ShowBranchModal from "./ShowBranchModal";
import manaraLocate from "../images/manara_locate.png";

interface MapContainerProps {
  google: any;
  center: { lat: number; lng: number };
}
const MapContainer: React.FC<MapContainerProps> = ({
  google,
  center: propCenter,
}) => {
  const [center, setCenter] = useState(propCenter);
  const [markers, setMarkers] = useState<BranchType[]>([]);
  const { currentLang } = useContext(AppCtxt);

  const [branchModalOpen, setBranchModalOpen] = useState(false);
  const [selectedBranchData, setSelectedBranchData] = useState<BranchType>(
    {} as BranchType
  );

  useEffect(() => {
    const getBranches = async () => {
      const langId = getLangId(currentLang!);
      const resp = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllBranches?LanguageId=${langId}`
      );
      let { Data } = await resp.json();
      console.log(Data);
      setMarkers(Data);
    };
    getBranches();
  }, [currentLang]);

  useEffect(() => {
    setCenter(propCenter);
  }, [propCenter]);

  return (
    <>
      <ShowBranchModal
        open={branchModalOpen}
        branch={selectedBranchData}
        onToggModal={(open) => {
          setBranchModalOpen(open);
        }}
      />
      <Map google={google} initialCenter={center} center={center} zoom={8}>
        {markers?.map((branch) => (
          <Marker
            key={branch.Id}
            title={branch.Name}
            onClick={() => {
              setSelectedBranchData(branch);
              setBranchModalOpen(true);
            }}
            icon={{
              url: manaraLocate,
            }}
            position={{ lat: branch.Latitude, lng: branch.Longitude }}
          />
        ))}
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCiL7I4MYHz39r07zbzA8AvDhLQz98fJkY",
  language: localStorage.getItem("lang")
    ? "" + localStorage.getItem("lang")
    : "ar",
})(MapContainer);

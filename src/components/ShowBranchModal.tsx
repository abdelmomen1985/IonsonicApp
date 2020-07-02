import React, { useState, useEffect } from "react";
import {
  IonModal,
  IonButton,
  IonCard,
  IonCardTitle,
  IonCardContent,
} from "@ionic/react";
import { strings } from "../localization/localization";
import { BranchType } from "../types/types";

interface ShowBranchModalProps {
  onToggModal: (open: boolean) => void; // Give parent full control
  open: boolean;
  branch: BranchType;
}

export default function ShowBranchModal({
  onToggModal,
  open,
  branch: propsBranch,
}: ShowBranchModalProps) {
  const [inOpen, setInOpen] = useState(open);
  const [branch, setBranch] = useState(propsBranch);

  useEffect(() => {
    setInOpen(open);
  }, [open]);

  useEffect(() => {
    setBranch(propsBranch);
  }, [propsBranch]);

  return (
    <IonModal isOpen={inOpen} cssClass="custom-modal branch-modal">
      <IonCard className="ion-padding ion-text-center">
        <div className="ion-padding">
          <IonCardTitle className="ctitle" color="primary">
            {branch.Name}
          </IonCardTitle>
        </div>

        <img src={branch.Image} alt="" style={{ borderRadius: "12px" }} />

        <IonCardContent>{branch.Description}</IonCardContent>
        <IonButton onClick={() => onToggModal(false)}>
          {strings.main.close}
        </IonButton>
      </IonCard>
    </IonModal>
  );
}

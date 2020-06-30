import React, { useState, useEffect } from "react";
import { IonModal, IonButton } from "@ionic/react";
import { strings } from "../localization/localization";

interface CallUsModalProps {
  onToggModal: (open: boolean) => void; // Give parent full control
  open: boolean;
}

export default function CallUsModal({ onToggModal, open }: CallUsModalProps) {
  const [inOpen, setInOpen] = useState(open);

  useEffect(() => {
    setInOpen(open);
  }, [open]);

  return (
    <IonModal isOpen={inOpen} cssClass="custom-modal contact-modal">
      Call Us Data
      <IonButton onClick={() => onToggModal(false)}>
        {strings.main.close}
      </IonButton>
    </IonModal>
  );
}

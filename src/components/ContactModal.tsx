import React, { useState, useEffect } from "react";
import { IonModal, IonButton } from "@ionic/react";

interface ContactModalProps {
  onSubmit: (lang: string) => void;
  onToggModal: (open: boolean) => void; // Give parent full control
  open: boolean;
}

export default function ContactModal({
  onSubmit,
  onToggModal,
  open,
}: ContactModalProps) {
  const [inOpen, setInOpen] = useState(open);

  useEffect(() => {
    setInOpen(open);
  }, [open]);

  return (
    <IonModal isOpen={inOpen} cssClass="custom-modal contact-modal">
      Modal Here
      <IonButton onClick={() => onToggModal(false)}>Close</IonButton>
    </IonModal>
  );
}

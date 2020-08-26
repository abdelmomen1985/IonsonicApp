import React, { useState, useEffect, useContext } from "react";
import { IonModal, IonButton, IonInput, IonText } from "@ionic/react";
import { strings } from "../localization/localization";
import { AppCtxt } from "../Context";
import { getLangId } from "../utils/functions";
import config from "../config";

interface EditPhoneModalProps {
  onToggModal: (open: boolean) => void; // Give parent full control
  onChangePhone: (phone: string) => void; // Give parent full control
  open: boolean;
}

export default function EditPhoneModal({
  onToggModal,
  onChangePhone,
  open,
}: EditPhoneModalProps) {
  const [inOpen, setInOpen] = useState(open);

  const { currentLang, appData, setAppData } = useContext(AppCtxt);

  const [phone, setPhone] = useState("");

  useEffect(() => {
    const fetchy = async () => {
      // get lang
      const langId = getLangId(currentLang!);

      let resp = await fetch(
        `${config.ORIG_URL}ManageGeneralData/GetAllGeneralData?LanguageId=${langId}&CountryId=0`
      );
      let { Data } = await resp.json();
      setAppData(Data);
    };
    if (!appData) {
      fetchy();
    }
  }, [appData, setAppData, currentLang]);

  useEffect(() => {
    setInOpen(open);
  }, [open]);

  return (
    <IonModal isOpen={inOpen} cssClass="custom-modal contact-modal">
      <div className="ion-text-center ion-margin-top">
        <br />
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onChangePhone(phone);
          onToggModal(false);
        }}
      >
        <IonText color="dark">
          <h2 className="title-colorless ion-margin">
            {strings.main.change} {strings.user.phone}
          </h2>
        </IonText>
        <div className="ion-text-center ion-margin-top">
          <br />
        </div>
        <div className="reg-element">
          <IonInput
            type="tel"
            name="phone"
            required
            min="9"
            className="reg-input"
            placeholder={strings.user.phone}
            value={phone}
            onIonChange={(e) => setPhone(e.detail.value!)}
          />
        </div>

        <div className="ion-text-center ion-margin-top">
          <br />
        </div>
        <div className="reg-element">
          <IonButton
            type="submit"
            expand="block"
            className="reg-btn"
            color="secondary"
          >
            {strings.main.save}
          </IonButton>
        </div>
        <div className="reg-element">
          <IonButton
            type="button"
            expand="block"
            className="reg-btn"
            onClick={() => onToggModal(false)}
          >
            {strings.main.close}
          </IonButton>
        </div>
      </form>
      <div className="ion-text-center ion-margin-top">
        <br />
      </div>
    </IonModal>
  );
}

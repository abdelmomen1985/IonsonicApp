import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  SyntheticEvent,
} from "react";
import {
  IonModal,
  IonButton,
  IonInput,
  IonTextarea,
  IonIcon,
} from "@ionic/react";
import { AppCtxt } from "../Context";
import { strings } from "../localization/localization";
import { useHistory } from "react-router-dom";
import { cameraOutline, cameraSharp } from "ionicons/icons";

interface ContactModalProps {
  onSubmit: (lang: string) => void;
  onToggModal: (open: boolean) => void; // Give parent full control
  open: boolean;
  contactTypeId: number;
}

export default function ContactModal({
  onSubmit,
  onToggModal,
  contactTypeId,
  open,
}: ContactModalProps) {
  const [inOpen, setInOpen] = useState(open);
  const [typeId, setTypeId] = useState(contactTypeId);
  const history = useHistory();
  const { user } = useContext(AppCtxt);
  useEffect(() => {
    setInOpen(open);
  }, [open]);
  /*
  const handleSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    const { name } = e.target as any;
    console.log("name", name.value);
    history.push("/offers");
    // Do something
    // also send typeId
  }, []);
  */

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { name } = e.target as any;
    console.log("name", name.value);
    // Just show success alert
    //history.push("/offers");
  };

  const onImgsAttached = () => {};

  useEffect(() => {
    setTypeId(contactTypeId);
  }, [contactTypeId]);

  return (
    <IonModal isOpen={inOpen} cssClass="custom-modal contact-modal">
      <form onSubmit={handleSubmit}>
        <div className="reg-element">
          <IonInput
            className="reg-input"
            name="name"
            placeholder={strings.user.name}
            value={user.FirstName + " " + user.LastName}
          />
        </div>
        <div className="reg-element">
          <IonTextarea
            className="reg-input"
            rows={6}
            name="desc"
            placeholder={""}
          />
        </div>
        <div className="ion-text-center">
          <label htmlFor="file-input">
            <div>
              <IonIcon
                icon={cameraSharp}
                color="dark"
                className="attach-icon"
              />
            </div>
          </label>

          <input
            type="file"
            id="file-input"
            className="hidden-file-input"
            onChange={onImgsAttached}
            multiple
          />
        </div>
        <div className="reg-element">
          <IonButton
            type="submit"
            expand="block"
            color="light"
            size="large"
            className="light-btn"
          >
            {strings.main.send}
          </IonButton>
        </div>
      </form>
      <IonButton onClick={() => onToggModal(false)}>
        {strings.main.close}
      </IonButton>
    </IonModal>
  );
}

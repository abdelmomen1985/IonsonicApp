import React, { useState, useEffect, useContext, SyntheticEvent } from "react";
import {
  IonModal,
  IonButton,
  IonInput,
  IonTextarea,
  IonIcon,
  IonToast,
} from "@ionic/react";
import { AppCtxt } from "../Context";
import { strings } from "../localization/localization";
import { cameraSharp } from "ionicons/icons";
import { bugy } from "../utils/functions";
import config from "../config";

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
  const [uploadFiles, setUploadFiles] = useState<string[]>([]);
  const { user } = useContext(AppCtxt);
  bugy(user);
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
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const { name, desc, images } = e.target as any;

    const formData = new FormData();
    formData.append("UserName", name.value);
    formData.append("TypeId", "" + typeId);
    formData.append("Details", desc.value);
    console.log("UserName", name.value);
    console.log("TypeId", typeId);
    console.log("Details", desc.value);
    // this.setState({ uploading: true })
    console.log("Images", images.files);
    if (images.files) {
      let i = 0;

      while (i < images.files?.length) {
        formData.append("Image", images.files[i]);
        i++;
      }
    }

    let resp = await fetch(`${config.API_URL}ManageCustomer/ContuctUsSave`, {
      method: "POST",
      body: formData,
    });
    console.log(resp);
    if (resp.status === 200) {
      setShowSuccessToast(true);
    }
    // Just show success alert
    //history.push("/offers");
  };

  const onImgsAttached = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      console.log("inside files");
      let i = 0;
      const uploadFiles = [];
      while (i < files?.length) {
        uploadFiles.push(files[i].name);
        i++;
      }
      setUploadFiles(uploadFiles);
    }
  };

  useEffect(() => {
    setTypeId(contactTypeId);
  }, [contactTypeId]);

  return (
    <>
      <IonToast
        isOpen={showSuccessToast}
        onDidDismiss={() => {
          setShowSuccessToast(false);
          onToggModal(false);
        }}
        message={strings.main.posted_successfuly}
        position="middle"
        duration={1000}
      />
      <IonModal
        isOpen={inOpen}
        cssClass="custom-modal contact-modal"
        onDidDismiss={() => onToggModal(false)}
      >
        <form onSubmit={handleSubmit}>
          <div className="reg-element">
            <IonInput
              className="reg-input"
              name="name"
              placeholder={strings.user.name}
              value={user ? user.FirstName + " " + user.LastName : ""}
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
              name="images"
              className="hidden-file-input"
              onChange={onImgsAttached}
              multiple
            />
          </div>
          {uploadFiles.map((item) => (
            <div className="attached-img" key={item}>
              {item}
            </div>
          ))}
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
    </>
  );
}

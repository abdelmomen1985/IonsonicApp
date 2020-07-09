import React, { useContext } from "react";
import {
  IonPage,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonContent,
} from "@ionic/react";
import { AppCtxt } from "../../Context";
import { cameraOutline, createOutline } from "ionicons/icons";
import avatarImg from "../../images/avatar.png";

import { strings } from "../../localization/localization";
import Footer from "../../components/Footer";
import config from "../../config";
import EveryHeader from "../../components/EveryHeader";
import { getMaritalStatus } from "../../utils/functions";
import { useHistory } from "react-router-dom";

export default function Profile() {
  const { currentLang, user } = useContext(AppCtxt);
  const history = useHistory();

  const changeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    // this.setState({ uploading: true })
    const formData = new FormData();
    formData.append("userId", "" + user.Id);
    if (files) {
      console.log("inside files");
      let i = 0;
      /*
      while (i < files?.length) {
        formData.append("Image", files[i]);
        i++;
      }
      */
      // OR
      formData.append("Image", files[i]);

      try {
        let resp = await fetch(
          `${config.API_URL}ManageCustomer/UpdateImageProfile`,
          {
            method: "POST",
            body: formData,
          }
        );
        /*
        // Try to login not working
        formData.append("email", "abdelmomen@gmail.com");
        formData.append("password", "123");
        let resp = await fetch(
          `${config.API_URL}ManageAccount/Login`,
          {
            method: "POST",
            body: formData,
          }
        );
        */
        let { Data } = await resp.json();
        if (Data?.Status === 200) {
          localStorage.setItem("UserData", JSON.stringify(Data.User));
          window.location.reload(false);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const editProfile = async () => {
    history.push("/edit_profile");
  };
  return (
    <IonPage
      style={{
        direction: currentLang === "ar" ? "rtl" : "ltr",
      }}
    >
      {/*
      <IonHeader>
        <IonToolbar color="tertiary" className="profile-toolbar">
          <IonButtons slot="start">
            <IonMenuToggle>
              <img src={menuIcon} alt="" />
            </IonMenuToggle>
          </IonButtons>
          <IonButtons slot="end">
            <IonIcon slot="icon-only" icon={arrowBackOutline} color="light" />
          </IonButtons>
          {<IonTitle> {strings.menu.profile} </IonTitle>}
        </IonToolbar>
      </IonHeader>
      */}
      <EveryHeader title={strings.menu.profile} backInstead={true}>
        <IonIcon
          icon={createOutline}
          color="light"
          style={{ fontSize: "1.2em" }}
          onClick={editProfile}
        />
      </EveryHeader>
      <IonContent>
        <div
          className="ion-text-center"
          style={{ maxHeight: "25vh", overflow: "hidden" }}
        >
          <div
            className="avatar-img"
            style={{
              border: "4px solid #efd5d5",
              boxShadow: "1px 2px 2px rgba(182, 30, 30, 0.3)",
            }}
          >
            <label
              htmlFor="file-input"
              style={{ minWidth: "50%", height: "100%" }}
            >
              <div className="imglabel-wrap">
                {user.ProfileImage ? (
                  <img
                    src={user.ProfileImage}
                    alt=""
                    style={{ maxWidth: "140%", borderRadius: "50%" }}
                  />
                ) : (
                  <img
                    src={avatarImg}
                    alt=""
                    style={{ maxWidth: "140%", borderRadius: "50%" }}
                  />
                )}
                <div className="change-img">
                  <IonIcon icon={cameraOutline} color="dark" />
                </div>
              </div>
            </label>

            <input
              type="file"
              id="file-input"
              className="hidden-file-input"
              onChange={changeImage}
            />
          </div>
        </div>
        <IonList>
          <IonItem>
            <IonLabel color="primary"> {strings.user.name} </IonLabel>
            <IonText>
              {" "}
              {user.FirstName} {user.LastName}
            </IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary"> {strings.user.phone} </IonLabel>
            <IonText dir="ltr"> {user.Phone} </IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary"> {strings.user.email} </IonLabel>
            <IonText> {user.Email} </IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary"> {strings.user.residency} </IonLabel>
            <IonText> {user.ResidencyId}</IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary"> {strings.user.city} </IonLabel>
            <IonText>{localStorage.getItem("CityName")}</IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary">{strings.user.material_status}</IonLabel>
            <IonText>
              {currentLang === "ar"
                ? getMaritalStatus(user.MaterialStatusId).ar_name
                : getMaritalStatus(user.MaterialStatusId).en_name}
            </IonText>
          </IonItem>
        </IonList>
      </IonContent>

      <Footer current="user_home" />
    </IonPage>
  );
}

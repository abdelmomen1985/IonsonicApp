import React, { useContext } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonMenuToggle,
  IonIcon,
  IonList,
  IonItem,
  IonLabel,
  IonText,
  IonContent,
} from "@ionic/react";
import { AppCtxt } from "../../Context";
import { arrowBackOutline } from "ionicons/icons";
import avatarImg from "../../images/avatar.png";
import menuIcon from "../../images/left_menu.png";
import { strings } from "../../localization/localization";
import Footer from "../../components/Footer";
import { UserType } from "../../types/types";
import config from "../../config";

export default function Profile() {
  const { currentLang } = useContext(AppCtxt);
  const userData = JSON.parse(localStorage.getItem("UserData")!) as UserType;
  return (
    <IonPage
      style={{
        direction: currentLang === "ar" ? "rtl" : "ltr",
      }}
    >
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
          {/** <IonTitle> {strings.menu.profile} </IonTitle>*/}
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="ion-text-center">
          <div className="user_profile_img">
            <label htmlFor="file-input">
              {userData.ProfileImage ? (
                <img
                  src={userData.ProfileImage}
                  alt=""
                  style={{ maxWidth: "140%" }}
                />
              ) : (
                <img src={avatarImg} alt="" style={{ maxWidth: "140%" }} />
              )}
            </label>

            <input
              type="file"
              id="file-input"
              className="hidden-file-input"
              onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                const files = e.target.files;
                // this.setState({ uploading: true })
                const formData = new FormData();
                formData.append("userId", "8");
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
                      localStorage.setItem(
                        "UserData",
                        JSON.stringify(Data.User)
                      );
                      window.location.reload(false);
                    }
                  } catch (error) {
                    console.error(error);
                  }
                }
              }}
            />
          </div>
        </div>
        <IonList>
          <IonItem>
            <IonLabel color="primary"> {strings.user.name} </IonLabel>
            <IonText>
              {" "}
              {userData.FirstName} {userData.LastName}
            </IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary"> {strings.user.phone} </IonLabel>
            <IonText dir="ltr"> {userData.Phone} </IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary"> {strings.user.email} </IonLabel>
            <IonText> {userData.Email} </IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary"> {strings.user.residency} </IonLabel>
            <IonText> {userData.ResidencyId}</IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary"> {strings.user.city} </IonLabel>
            <IonText> </IonText>
          </IonItem>

          <IonItem>
            <IonLabel color="primary">{strings.user.material_status}</IonLabel>
            <IonText></IonText>
          </IonItem>
        </IonList>
      </IonContent>

      <Footer current="user_home" />
    </IonPage>
  );
}

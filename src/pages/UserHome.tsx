import React, { useContext, useState } from "react";
import {
  IonContent,
  IonMenuToggle,
  IonButton,
  IonText,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonIcon,
} from "@ionic/react";
import avatarImg from "../images/avatar.png";
import menuIcon from "../images/left_menu.png";
import cardIcon from "../images/card_icon.png";

import { strings } from "../localization/localization";
import Footer from "../components/Footer";
import { AppCtxt } from "../Context";
import ContactModal from "../components/ContactModal";
import { RefresherEventDetail } from "@ionic/core";
import Axios from "axios";
import config from "../config";
import { radioButtonOff, radioButtonOnOutline } from "ionicons/icons";

export default function UserHome() {
  const { currentLang, user, setUserData } = useContext(AppCtxt);
  const [modalOpen, setModalOpen] = useState(false);
  const doRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    let resp = await Axios.post(`${config.API_URL}ManageAccount/Login`, {
      email: user.Email,
      password: user.Password,
    });
    const { Data } = resp.data;
    if (Data?.Status === 200) setUserData(Data.User);
    console.log(Data);
    event.detail.complete();
  };
  return (
    <>
      <ContactModal
        contactTypeId={3}
        onSubmit={() => {}}
        open={modalOpen}
        onToggModal={(open) => {
          setModalOpen(open);
        }}
      />
      <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
        {user?.Id && (
          <IonContent className="user-home-bg">
            <IonRefresher slot="fixed" onIonRefresh={doRefresh}>
              <IonRefresherContent> </IonRefresherContent>
            </IonRefresher>
            <div className="top-bg">
              <div className="top-nav">
                <div>
                  <IonMenuToggle>
                    <img src={menuIcon} alt="" />
                  </IonMenuToggle>
                </div>

                <IonButton
                  fill="clear"
                  routerLink="/user_card"
                  style={{ margin: "0px", marginTop: "-5px" }}
                >
                  <img src={cardIcon} alt="" />
                </IonButton>
              </div>
            </div>

            <div className="ion-text-center user-avatar">
              <div>
                <IonText color="light" style={{ fontSize: "larger" }}>
                  {user.FirstName} {user.LastName}
                </IonText>
                <br />
                <div className="ion-margin-top">
                  <IonText color="light">
                    {strings.user.account_status}{" "}
                  </IonText>
                  <span>&nbsp;</span>
                  {user.walts ? (
                    <>
                      <IonIcon icon={radioButtonOnOutline} color="success" />
                      <span>&nbsp;</span>
                      <IonText color="success">
                        {strings.account_statuses.active}
                      </IonText>
                    </>
                  ) : (
                    <>
                      <IonIcon icon={radioButtonOnOutline} color="danger" />
                      <span>&nbsp;</span>
                      <IonText color="danger">
                        {strings.account_statuses.stopped}
                      </IonText>
                    </>
                  )}
                </div>
              </div>
              <div className={`avatar-img ${user.type}-border`}>
                {user?.ProfileImage ? (
                  <img
                    src={user.ProfileImage}
                    alt=""
                    style={{ maxWidth: "140%", maxHeight: "200px" }}
                  />
                ) : (
                  <img
                    src={avatarImg}
                    alt=""
                    style={{ maxWidth: "140%", maxHeight: "200px" }}
                  />
                )}
              </div>
            </div>
            <div className="ion-text-center">
              <IonText color="medium">{strings.watts.available}</IonText>
              <div>
                {" "}
                <IonText
                  color="tertiary"
                  style={{ fontSize: "1.7em", fontWeight: "bold" }}
                >
                  {user.walts} {strings.watts.title}
                </IonText>
              </div>
            </div>
            <div className="divider-dark"></div>
            <div>
              <div className="reg-element">
                <IonButton
                  type="button"
                  expand="block"
                  color="light"
                  size="large"
                  className="light-btn"
                  routerLink="/transactions"
                >
                  {strings.main.my_transactions}
                </IonButton>
              </div>
              <div className="reg-element">
                <IonButton
                  type="button"
                  expand="block"
                  color="light"
                  size="large"
                  className="light-btn"
                  onClick={() => {
                    // Open Modal
                    setModalOpen(true);
                  }}
                >
                  {strings.main.previous_work}
                </IonButton>
              </div>
              {/* 
            <div className="reg-element">
              <IonButton
                type="button"
                expand="block"
                color="light"
                size="large"
                className="light-btn"
                routerLink="/redeem_ctg"
              >
                {strings.main.av_gifts_vouchers}
              </IonButton>
            </div>
            <div className="reg-element">
              <IonButton
                type="button"
                expand="block"
                color="light"
                size="large"
                className="light-btn"
                routerLink="/offers"
              >
                {strings.offers.title}
              </IonButton>
            </div>
            */}
            </div>
          </IonContent>
        )}
        <Footer current="user_home" />
      </IonPage>
    </>
  );
}

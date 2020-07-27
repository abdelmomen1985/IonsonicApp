import { IonContent, IonPage, IonMenuToggle, IonIcon } from "@ionic/react";
import React, { useEffect, useContext } from "react";
import LandingSelect from "../components/LandingSelect";
import { useHistory } from "react-router-dom";

import { menuOutline } from "ionicons/icons";
import { AppCtxt } from "../Context";
import { UserType } from "../types/types";
import Axios from "axios";
import config from "../config";

//import ExploreContainer from "../components/ExploreContainer";

const Home: React.FC = () => {
  const history = useHistory();
  const userData = localStorage.getItem("UserData");
  const { loggedIn, setUserData } = useContext(AppCtxt);

  // Listener back-button
  /*
  useEffect(() => {
    if (Capacitor.isNative) {
      Plugins.App.addListener("backButton", (e) => {
        // Use of location.pathname is also correct
        if (
          window.location.pathname === "/" ||
          window.location.pathname === "/home" ||
          window.location.pathname === "/user_home"
        ) {
          Plugins.App.exitApp();
        } else {
          history.goBack();
        }
      });
    }
  }, [history]);
  */

  // TODO : no internet [later]
  useEffect(() => {
    const userLogin = async () => {
      const user = JSON.parse(localStorage.getItem("UserData")!) as UserType;

      const resp = await Axios.post(`${config.API_URL}ManageAccount/Login`, {
        email: user.Email,
        password: user.Password,
      });

      let { Data } = resp.data;
      if (Data && Data.Status === 200) {
        setUserData(Data.User);
      } else if (Data.Status === 400) {
        // Show error
        console.error("Login Error");
      }
    };

    if (localStorage.getItem("UserData") && !loggedIn) {
      // Login for the first time only
      console.log("Login again for first open");
      userLogin();
    } else if (localStorage.getItem("UserData")) {
      // will get to here if user got updated
      history.replace("/user_home");
    } else if (localStorage.getItem("OTP_PHONE")) {
      history.replace("/otp");
    }
    console.log("My Home");
  }, [loggedIn]);

  /*
  useEffect(() => {

  }, []);
  */
  return (
    <IonPage>
      <div style={{ position: "relative" }}>
        <IonMenuToggle className="home-menu-icon">
          <IonIcon icon={menuOutline} color="primary" />
        </IonMenuToggle>
      </div>
      {/*
      
      <IonHeader>
        <IonToolbar>
          <IonTitle>التسجيل</IonTitle>
        </IonToolbar>
      </IonHeader>
      */}

      <IonContent className="land-bg" id="main-content">
        {" "}
        <LandingSelect />
      </IonContent>

      {/*
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        
        <RegisterForm />

        <IonButton routerLink="/slider">Slider</IonButton>
        <IonTitle>{offerDesc}</IonTitle>
        */}
    </IonPage>
  );
};

export default Home;

import { IonContent, IonPage, IonMenuToggle, IonIcon } from "@ionic/react";
import React, { useEffect } from "react";
import LandingSelect from "../components/LandingSelect";
import { useHistory } from "react-router-dom";

import { menuOutline } from "ionicons/icons";

//import ExploreContainer from "../components/ExploreContainer";

const Home: React.FC = () => {
  const history = useHistory();
  const userData = localStorage.getItem("UserData");

  // TODO : no internet [later]
  useEffect(() => {
    if (localStorage.getItem("UserData")) {
      history.push("/user_home");
    }
  }, [history]);

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
      {!userData && (
        <IonContent className="land-bg" id="main-content">
          {" "}
          <LandingSelect />
        </IonContent>
      )}

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

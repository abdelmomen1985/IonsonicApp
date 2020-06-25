import { IonContent } from "@ionic/react";
import React from "react";
import LandingSelect from "../components/LandingSelect";
//import ExploreContainer from "../components/ExploreContainer";

const Home: React.FC = () => {
  return (
    <>
      {/*
      <IonHeader>
        <IonToolbar>
          <IonTitle>التسجيل</IonTitle>
        </IonToolbar>
      </IonHeader>
      */}
      <IonContent className="land-bg">
        {/*
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        
        <RegisterForm />

        <IonButton routerLink="/slider">Slider</IonButton>
        */}
        <LandingSelect />
      </IonContent>
    </>
  );
};

export default Home;

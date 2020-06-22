import { IonContent, IonPage, IonButton } from "@ionic/react";
import React from "react";
//import ExploreContainer from "../components/ExploreContainer";
import "./Home.css";
import RegisterForm from "../components/RegisterForm";

const Home: React.FC = () => {
  return (
    <IonPage>
      {/*
      <IonHeader>
        <IonToolbar>
          <IonTitle>التسجيل</IonTitle>
        </IonToolbar>
      </IonHeader>
      */}
      <IonContent className="reg-bg">
        {/*
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer />
        */}
        <RegisterForm />
        <IonButton routerLink="/slider">Slider</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Home;

import { IonContent, IonPage } from "@ionic/react";
import React from "react";
import RegisterForm from "../components/RegisterForm";
//import ExploreContainer from "../components/ExploreContainer";

const Register: React.FC = () => {
  return (
    <>
      {/*
      <IonHeader>
        <IonToolbar>
          <IonTitle>التسجيل</IonTitle>
        </IonToolbar>
      </IonHeader>
      */}
      <IonContent className="reg-bg" id="main-content">
        <RegisterForm />
      </IonContent>
    </>
  );
};

export default Register;

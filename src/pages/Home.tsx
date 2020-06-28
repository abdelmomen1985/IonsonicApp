import { IonContent, IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import LandingSelect from "../components/LandingSelect";
import { useHistory } from "react-router-dom";
import { bugy } from "../utils/functions";

//import ExploreContainer from "../components/ExploreContainer";

const Home: React.FC = () => {
  const history = useHistory();
  const userData = localStorage.getItem("UserData");

  useEffect(() => {
    bugy("Loading Home");
    if (userData) {
      history.push("/slider");
    }
  }, [history, userData]);

  /* Testing fetch
  const [offerDesc, setOfferDesc] = useState("");
  useEffect(() => {
    const fetchy = async () => {
      let first = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllOffers?PageIndex=1&LanguageId=1&PageSize=100`
      );
      let { Data } = await first.json();
      console.log(Data);
      setOfferDesc(Data.offers[0].Description);
    };
    fetchy();
  }, []);
  */
  return (
    <IonPage>
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

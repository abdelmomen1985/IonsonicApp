import React from "react";
import {
  IonSlides,
  IonSlide,
  IonContent,
  IonButton,
  IonPage,
} from "@ionic/react";
import slide from "../images/register_bg.jpg";
import slide1 from "../images/slide_1.jpg";
import slide2 from "../images/slide_2.jpg";
import { strings } from "../localization/localization";
import { useHistory } from "react-router-dom";
// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const Slider: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <IonSlides className="fullh" pager={true} options={slideOpts}>
          <IonSlide className="fullh">
            <img src={slide} alt="" className="fullh" />
          </IonSlide>
          <IonSlide>
            <img src={slide1} alt="" className="fullh" />
          </IonSlide>
          <IonSlide>
            <div className="intro-slide">
              <img src={slide2} alt="" className="fullh" />
              <div className="intro-slide-btn">
                <IonButton
                  onClick={() => {
                    const userData = localStorage.getItem("UserData");
                    if (userData) history.push("/user_home");
                    else history.push("/welcome");
                  }}
                >
                  {strings.slider.next}
                </IonButton>
              </div>
            </div>
          </IonSlide>
        </IonSlides>
      </IonContent>
    </IonPage>
  );
};

export default Slider;

import React from "react";
import { IonSlides, IonSlide, IonContent, IonButton } from "@ionic/react";
import slide from "../images/register.jpg";
// Optional parameters to pass to the swiper instance. See http://idangero.us/swiper/api/ for valid options.
const slideOpts = {
  initialSlide: 0,
  speed: 400,
};

const Slider: React.FC = () => (
  <IonContent>
    <IonSlides className="fullh" pager={true} options={slideOpts}>
      <IonSlide className="fullh">
        <img src={slide} alt="" className="fullh" />
      </IonSlide>
      <IonSlide>
        <h1>Slide 2</h1>
      </IonSlide>
      <IonSlide>
        <h1>Slide 3</h1>
        <IonButton routerLink="/">Home</IonButton>
      </IonSlide>
    </IonSlides>
  </IonContent>
);

export default Slider;

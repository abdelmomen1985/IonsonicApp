import React, { SyntheticEvent, useCallback } from "react";
import { IonPage, IonContent, IonInput, IonButton } from "@ionic/react";
import manaraLogo from "../images/manara_txt_logo.png";
import { strings } from "../localization/localization";
import config from "../config";
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();
  const handleSubmit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();
    const { email, password } = e.target as any;

    try {
      /*
      const headers = {
        "Content-Type": "application/json",
      };
      let resp = await axios.post(
        `${config.API_URL}ManageAccount/Login`,
        {
          email: email.value,
          password: password.value,
        },
        { headers }
      );
      
      let first = await fetch(
        `${config.API_URL}ManageGeneralData/GetAllOffers?PageIndex=1&LanguageId=1&PageSize=100`
      );
      let { Data } = await first.json();
      console.log(Data);
      */

      let resp = await fetch(`${config.PROXY_POST}ManageAccount/Login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      });
      let { Data } = await resp.json();
      if (Data?.User) {
        localStorage.setItem("UserData", JSON.stringify(Data.User));
        history.push("/welcome");
      }
    } catch (error) {
      alert(error);
    }
  }, []);

  return (
    <IonPage>
      <IonContent className="login-bg">
        <div className="ion-text-center" style={{ marginTop: "5vh" }}>
          <img src={manaraLogo} alt="" />
        </div>
        <div style={{ marginTop: "18vh" }}>
          <h3 className="title ion-margin">{strings.login.title}</h3>
          <form onSubmit={handleSubmit}>
            <div className="reg-element">
              <IonInput
                type="email"
                ref={(input) => input && input.focus()}
                name="email"
                className="reg-input"
                placeholder={strings.user.email}
              />
            </div>
            <div className="reg-element">
              <IonInput
                type="password"
                name="password"
                className="reg-input"
                placeholder={strings.user.password}
              />
            </div>

            <div className="reg-element">
              <IonButton type="submit" expand="block" className="reg-btn">
                {strings.login.title}
              </IonButton>
            </div>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
}

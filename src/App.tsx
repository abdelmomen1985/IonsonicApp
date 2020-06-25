import React, { useEffect, useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import Slider from "./pages/Slider";
import LoggedOut from "./pages/LoggedOut";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import UserHome from "./pages/UserHome";
import Offers from "./pages/Offers";
import AppMenu from "./components/AppMenu";

const App: React.FC = () => {
  const [lang, setLang] = useState<string>("ar");
  // first check user lang
  useEffect(() => {
    const lang = localStorage.getItem("lang");
    setLang(lang as string);
  }, []);

  return (
    <IonApp>
      <IonReactRouter>
        <AppMenu lang={lang} />
        <IonRouterOutlet>
          <Switch>
            <Route path="/home" component={Home} exact />
            <Route path="/slider" component={Slider} exact />
            <Route path="/register" component={Register} exact />
            <Route path="/out" component={LoggedOut} exact />
            <Route path="/login" component={Login} exact />
            <Route path="/welcome" component={Welcome} exact />
            <Route path="/user_home" component={UserHome} exact />
            <Route path="/offers" component={Offers} exact />
            <Route exact path="/" render={() => <Redirect to="/home" />} />
          </Switch>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

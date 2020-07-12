import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
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
import RedeemCtg from "./pages/RedeemCtg";
import Profile from "./pages/side/Profile";
import Settings from "./pages/side/Settings";
import ContactUs from "./pages/side/ContactUs";
import SideInfo from "./pages/side/SideInfo";
import Notifications from "./pages/Notifications";
import UserTransactions from "./pages/UserTransactions";
import { AppCtxt } from "./Context";
import BranchesMap from "./pages/BranchesMap";
import SingleMap from "./pages/SingleMap";
import NewsAndTips from "./pages/NewsAndTips";
import UserCard from "./pages/UserCard";
import RedeemItems from "./pages/RedeemItems";
import EditProfile from "./pages/EditProfile";

const App: React.FC = () => {
  const { currentLang } = useContext(AppCtxt);
  // first check user lang
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
          //Plugins.App.exitApp();
          bugy("Will Exit APP");
        } else {
          bugy("Nothing TO DO");
        }
      });
    }
  }, []);
  */

  return (
    <IonApp>
      <IonReactRouter>
        <IonSplitPane contentId="main-content">
          <AppMenu lang={currentLang as string} />

          <IonRouterOutlet id="main-content">
            <Route path="/home" component={Home} />
            <Route path="/slider" component={Slider} />
            <Route path="/register" component={Register} />
            <Route path="/out" component={LoggedOut} />
            <Route path="/login" component={Login} />
            <Route path="/welcome" component={Welcome} />
            <Route path="/user_home" component={UserHome} />
            <Route path="/user_card" component={UserCard} />
            <Route path="/offers" component={Offers} />
            <Route path="/branches" component={BranchesMap} />
            <Route path="/area_map/:areaId" component={SingleMap} />
            <Route path="/redeem_ctg" component={RedeemCtg} />
            <Route path="/redeem/:what" component={RedeemItems} />
            <Route path="/notifications" component={Notifications} />
            <Route path="/transactions" component={UserTransactions} />
            {/** side menu */}
            <Route path="/profile" component={Profile} />
            <Route path="/edit_profile" component={EditProfile} />
            <Route path="/settings" component={Settings} />
            <Route path="/contact_us" component={ContactUs} />
            <Route path="/tips" component={NewsAndTips} />
            <Route path="/help" component={SideInfo} />
            <Route path="/privacy" component={SideInfo} />
            <Route path="/terms" component={SideInfo} />
            <Route path="/how" component={SideInfo} />

            <Redirect exact from="/" to="/home" />
          </IonRouterOutlet>
        </IonSplitPane>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;

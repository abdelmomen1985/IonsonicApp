import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { CtxtProvider } from "./Context";
import { Plugins } from "@capacitor/core";
import { bugy } from "./utils/functions";

ReactDOM.render(<CtxtProvider />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

document.addEventListener("ionBackButton", (ev: any) => {
  if (window.location.pathname === "/user_home") {
    ev.detail.register(1, () => {
      bugy("user_home back pressed");
    });
  }

  if (window.location.pathname === "/otp") {
    ev.detail.register(1, () => {
      bugy("otp back pressed");
    });
  }

  ev.detail.register(-1, () => {
    console.log("ionBackButton pressed in path:", window.location.pathname);
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/home"
    ) {
      Plugins.App.exitApp();
    }
  });
});

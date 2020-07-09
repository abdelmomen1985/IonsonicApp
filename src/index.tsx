import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { CtxtProvider } from "./Context";
import { Plugins } from "@capacitor/core";
const { App } = Plugins;

ReactDOM.render(<CtxtProvider />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

/*
document.addEventListener("ionBackButton", (ev: any) => {
  const routerEl = document.querySelector("ion-router");
  ev.detail.register(10, () => {
    const path = window.location.pathname;
    console.log(path, routerEl?.root, "Home");
    if (path === routerEl?.root) {
      App.exitApp();
    }
  });
});
*/

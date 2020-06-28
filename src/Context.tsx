import React, { useReducer } from "react";
import App from "./App";
import { UserType } from "./types/types";
import { bugy } from "./utils/functions";

const ACTION_TYPES = {
  CHANGE_CURRENT_LANG: "CHANGE_CURRENT_LANG",
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_LOGGED_OUT: "USER_LOGGED_OUT",
};

const initialState = {
  user: localStorage.getItem("UserData")
    ? (JSON.parse(localStorage.getItem("UserData")!) as UserType)
    : ({} as UserType),
  currentLang: localStorage.getItem("lang"),
  setCurrentLang: (lang: string) => {},
  setUserData: (user: UserType) => {},
};

const AppCtxt = React.createContext({ ...initialState });

function appReducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_TYPES.USER_LOGGED_IN:
      let { user } = action;
      bugy("USER_LOGGED_IN");
      bugy(user);
      return {
        ...state,
        user,
      };
    case ACTION_TYPES.CHANGE_CURRENT_LANG:
      const { currentLang } = action;
      return { ...state, currentLang };
    case ACTION_TYPES.USER_LOGGED_OUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function CtxtProvider(props: any) {
  const [state, dispatch] = useReducer(appReducer, { ...initialState });

  function setCurrentLang(lang: string) {
    dispatch({ currentLang: lang, type: ACTION_TYPES.CHANGE_CURRENT_LANG });
  }

  function setUserData(user: UserType) {
    dispatch({ user, type: ACTION_TYPES.USER_LOGGED_IN });
  }

  return (
    <AppCtxt.Provider
      value={{
        notebook: state.notebook,
        currentLang: state.currentLang,
        user: state.user,
        setUserData,

        setCurrentLang,
      }}
      {...props}
    >
      <App />
    </AppCtxt.Provider>
  );
}

export { AppCtxt, CtxtProvider };

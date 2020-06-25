import React, { useReducer } from "react";
import App from "./App";
import { UserType } from "./types/types";

const ACTION_TYPES = {
  CHANGE_NOTEBOOK: "CHANGE_NOTEBOOK",
  CHANGE_CURRENT_LANG: "CHANGE_CURRENT_LANG",
  USER_LOGGED_IN: "USER_LOGGED_IN",
  USER_LOGGED_OUT: "USER_LOGGED_OUT",
};

const initialState = {
  notebook: {},
  user: null,
  currentLang: localStorage.getItem("lang"),
};

const AppCtxt = React.createContext({ ...initialState });

function appReducer(state: any, action: any) {
  switch (action.type) {
    case ACTION_TYPES.CHANGE_NOTEBOOK:
      let notebook = {
        name: action.payload.name,
        id: action.payload.id,
      };
      return {
        ...state,
        notebook,
      };
    case ACTION_TYPES.USER_LOGGED_IN:
      let { user } = action.payload;
      return {
        ...state,
        user,
      };
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

  function setNotebook(notebook: any) {
    dispatch({ notebook: notebook, type: ACTION_TYPES.CHANGE_NOTEBOOK });
  }

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
        setNotebook,
        setCurrentLang,
      }}
      {...props}
    >
      <App />
    </AppCtxt.Provider>
  );
}

export { AppCtxt, CtxtProvider };

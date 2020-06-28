import React, { useContext, useState } from "react";
import { IonPage, IonButton } from "@ionic/react";
import EveryHeader from "../../components/EveryHeader";
import { strings } from "../../localization/localization";
import { AppCtxt } from "../../Context";
import SelectLangModal from "../../components/SelectLangModal";

export default function Settings() {
  const { currentLang } = useContext(AppCtxt);

  const [showModalLang, setShowModalLang] = useState(false);

  const selectLang = (lang: string) => {
    // Change selected lang
    localStorage.setItem("lang", lang);

    setShowModalLang(false);
    window.location.reload(false);
  };

  return (
    <>
      <SelectLangModal
        onSelectLang={selectLang}
        onToggModal={(open) => {
          setShowModalLang(open);
        }}
        open={showModalLang}
      />
      <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
        <EveryHeader title={strings.menu.settings} />

        <div
          className="reg-element"
          style={{ height: "100%", paddingTop: "10vh" }}
        >
          <IonButton
            onClick={() => setShowModalLang(true)}
            type="button"
            expand="block"
            color="light"
            size="large"
            className="light-btn"
          >
            {strings.main.change_langauge}
          </IonButton>
        </div>
      </IonPage>
    </>
  );
}

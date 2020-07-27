import React, {
  useState,
  useCallback,
  SyntheticEvent,
  useContext,
} from "react";
import {
  IonButton,
  IonInput,
  IonChip,
  IonIcon,
  IonLabel,
  IonToast,
  IonContent,
  IonPage,
} from "@ionic/react";
import { strings } from "../localization/localization";
import Axios from "axios";
import config from "../config";
import { alertCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import { AppCtxt } from "../Context";

export default function ChangePassword() {
  const [validationErrors, setValidationErrors] = useState<any>({});
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const history = useHistory();
  const { user, setUserData } = useContext(AppCtxt);

  const doRegister = useCallback(
    async (e: SyntheticEvent) => {
      e.preventDefault();
      const { password, confirmPassword } = e.target as any;

      // First Check Data

      if (/\s/.test(password.value)) {
        console.log("contain_space", password.value);
        setValidationErrors({ contain_space: true });
        return;
      }

      if (confirmPassword.value !== password.value) {
        // First will remove old
        setValidationErrors({ mismatch: true });
        return;
      }

      let resp = await Axios.post(
        `${config.API_URL}ManageAccount/ChangePassword`,
        {
          email: localStorage.getItem("UserEmail")
            ? localStorage.getItem("UserEmail")
            : user?.Email,
          password: password.value,
          confirm_password: password.value,
        }
      );
      let { Data } = resp.data;

      if (Data.Status === 200) {
        // Success Logic Goes here
        localStorage.removeItem("UserEmail");
        localStorage.removeItem("OTP_FORGOT");
        setUserData(Data.User);
        setShowSuccessToast(true);
      }
    },
    [setShowSuccessToast]
  );
  return (
    <IonPage>
      <IonContent className="reg-bg" id="main-content">
        <IonToast
          isOpen={showSuccessToast}
          onDidDismiss={() => {
            setShowSuccessToast(false);
            if (user) history.push("/user_home");
            else history.push("/login");
          }}
          message={strings.login.register_done_successfuly}
          position="middle"
          duration={1200}
        />
        <div className="ion-text-center ion-margin-top">
          <br />
        </div>
        <div className="ion-text-center ion-margin-top">
          <br />
        </div>
        <form onSubmit={doRegister}>
          <h2 className="title ion-margin">
            {strings.main.change} {strings.user.password}
          </h2>
          <div className="ion-text-center ion-margin-top">
            <br />
          </div>
          <div className="reg-element">
            {validationErrors?.contain_space && (
              <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
                <IonIcon icon={alertCircleOutline} />
                <IonLabel>{strings.login.contain_space}</IonLabel>
              </IonChip>
            )}
            <IonInput
              type="password"
              name="password"
              required
              minlength={8}
              className="reg-input"
              placeholder={strings.user.password}
            />
          </div>

          <div className="reg-element">
            {validationErrors?.mismatch && (
              <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
                <IonIcon icon={alertCircleOutline} />
                <IonLabel>{strings.login.mismatch_password}</IonLabel>
              </IonChip>
            )}
            <IonInput
              type="password"
              name="confirmPassword"
              required
              minlength={8}
              className="reg-input"
              placeholder={strings.user.confirm_password}
            />
          </div>
          <div className="ion-text-center ion-margin-top">
            <br />
          </div>
          <div className="reg-element">
            <IonButton type="submit" expand="block" className="reg-btn">
              {strings.user.register}
            </IonButton>
          </div>
        </form>
      </IonContent>
    </IonPage>
  );
}

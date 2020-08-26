import {
  IonButton,
  IonChip,
  IonContent,
  IonHeader,
  IonIcon,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { SyntheticEvent, useEffect, useState } from "react";
// @ts-ignore
import OtpInput from "react-otp-input";
import { strings } from "../localization/localization";
import Axios from "axios";
import config from "../config";
import { alertCircleOutline } from "ionicons/icons";
import { useHistory } from "react-router-dom";
import EditPhoneModal from "../components/EditPhoneModal";
import { UserType } from "../types/types";
import { bugy } from "../utils/functions";
//import ExploreContainer from "../components/ExploreContainer";

const OTPPage: React.FC = () => {
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [phone, setPhone] = useState("");
  const [displayPhone, setDisplayPhone] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  let userCountry = localStorage.getItem("country");
  let countryCode = "";
  if (userCountry === "ksa") countryCode = "+966";
  else if (userCountry === "uae") countryCode = "+971";
  else if (userCountry === "eg") countryCode = "+20";

  let checkOTP = localStorage.getItem("OTP_PHONE");

  const resendCode = async (phone: string) => {
    if (phone)
      await Axios.post(`${config.API_URL}ManageAccount/ForgetPassword`, {
        mobile: phone,
      });
  };

  const changePhone = async (phone: string) => {
    // check user phone
    /*
    if (phone.length === 9 && phone.charAt(0) !== "0") phone = "0" + phone;
    phone = phone.substr(-10);
    */
    if (userCountry === "eg") phone = phone.substr(-10);
    else phone = phone.substr(-9);
    phone = "0" + phone;
    phone = countryCode + phone;
    setPhone(phone);

    // TODO later change user phone
    let user = JSON.parse(localStorage.getItem("REG_USER")!) as UserType;
    const newUser = {
      ...user,
      Phone: phone,
    } as UserType;
    console.log(user, newUser);
    // Verify at first

    const formData = new FormData();
    formData.append("Id", "" + newUser.Id);
    formData.append("FirstName", newUser.FirstName);
    formData.append("LastName", " ");
    formData.append("BirthDate", newUser.BirthDate);
    formData.append("Phone", newUser.Phone);
    formData.append("Email", newUser.Email);
    formData.append("Password", "" + newUser.Password);
    formData.append("CityId", "" + newUser.CityId);
    formData.append("ResidencyId", newUser.ResidencyId);
    formData.append("MaterialStatusId", "" + newUser.MaterialStatusId);
    formData.append("Image", "" + newUser.ProfileImage);
    const resp = await Axios.post(
      `${config.API_URL}ManageCustomer/UpdateCustomer`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    let { Data } = resp.data;
    if (Data && Data.Status === 200) {
      localStorage.setItem("OTP_PHONE", phone);
      // now resend code
      await resendCode(phone);
    }
    bugy(phone);
    bugy(displayPhone);
  };

  const doRegister = async (e: SyntheticEvent) => {
    e.preventDefault();

    let resp = await Axios.post(`${config.API_URL}ManageAccount/Verification`, {
      mobile: phone,
      code: otp,
    });
    let { Data } = resp.data;
    console.log(Data);
    setOtp("");

    if (Data.Status === 400) {
      setError(strings.main.verify_error);
      setOtp("");
      return;
    } else if (Data.Status === 200) {
      if (localStorage.getItem("OTP_PHONE")) {
        localStorage.removeItem("OTP_PHONE");
        history.push("/login");
      }
      if (localStorage.getItem("OTP_FORGOT")) {
        localStorage.setItem("UserEmail", Data.User.Email);
        history.push("/change_password");
      }
    }
  };

  useEffect(() => {
    if (userCountry !== "eg") {
      let newphone = phone.substr(-9);
      newphone = countryCode + newphone;
      setDisplayPhone(newphone);
    } else setDisplayPhone(phone);
  }, [phone]);

  useEffect(() => {
    console.log("Revisit !");
    if (localStorage.getItem("OTP_PHONE"))
      setPhone(localStorage.getItem("OTP_PHONE") + "");
    else if (localStorage.getItem("OTP_FORGOT"))
      setPhone(localStorage.getItem("OTP_FORGOT") + "");
  }, [userCountry, checkOTP]);

  return (
    <>
      <EditPhoneModal
        open={modalOpen}
        onChangePhone={changePhone}
        onToggModal={(open) => {
          setModalOpen(open);
        }}
      />

      <IonPage>
        <IonHeader>
          <IonToolbar color="dark" className="main-toolbar ion-text-center">
            <IonTitle>{strings.main.verify}</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent id="main-content">
          <div className="ion-text-center ion-margin-top">
            <br />
          </div>
          <form onSubmit={doRegister}>
            <div className="ion-text-center ion-margin-top">
              <IonText
                style={{
                  padding: ".5em",
                  fontSize: "1.2em",
                }}
                color="dark"
              >
                {strings.main.verify_text}
              </IonText>
            </div>
            <div className="ion-text-center ion-margin-top">
              <IonText
                style={{
                  padding: ".5em",
                  backgroundColor: "#bbb",
                  borderRadius: "6px",
                  fontWeight: "bold",
                }}
              >
                {displayPhone}
              </IonText>
              <div className=" ion-margin-top">
                <IonText
                  color="blue"
                  style={{ fontWeight: "bold" }}
                  onClick={() => {
                    setModalOpen(true);
                  }}
                >
                  {strings.main.change} {strings.user.phone}
                </IonText>
              </div>
            </div>
            <div className="ion-text-center ion-margin-top">
              <br />
            </div>
            <div className="ion-text-center ion-margin-top">
              <IonText>{strings.main.verify_enter}</IonText>
            </div>
            <div className="ion-text-center ion-margin-top">
              <OtpInput
                inputStyle="inputStyle"
                containerStyle={{ justifyContent: "center" }}
                value={otp}
                onChange={(val: any) => {
                  console.log(val);
                  setOtp(val);
                }}
                isInputNum={true}
                numInputs={4}
                separator={<span></span>}
              />
            </div>
            <div className="ion-text-center ion-margin-top">
              <br />
            </div>
            <div className="reg-element ion-margin-top">
              <IonButton type="submit" expand="block" className="reg-btn">
                {strings.user.register}
              </IonButton>
            </div>
          </form>

          {error && (
            <div className="ion-text-center ion-margin-top">
              <IonChip color="danger" style={{ backgroundColor: "#dedede" }}>
                <IonIcon icon={alertCircleOutline} />
                <IonLabel>{error}</IonLabel>
              </IonChip>
            </div>
          )}

          <div className="ion-text-center ion-margin-top">
            <IonText
              color="blue"
              style={{ fontSize: "1.1em" }}
              onClick={() => resendCode(phone)}
            >
              {strings.login.resend_code}
            </IonText>
          </div>

          <div className="ion-text-center ion-margin-top ">
            <IonText
              color="danger"
              style={{ fontSize: "1.1em" }}
              onClick={() => {
                localStorage.clear();
                history.replace("/");
              }}
            >
              {strings.main.un_verify}
            </IonText>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default OTPPage;

import React, { useState } from "react";
import {
  IonDatetime,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonInput,
} from "@ionic/react";

export default function RegisterForm() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [gender, setGender] = useState<string>();
  return (
    <div>
      <form>
        <h2 className="title ion-margin">التسجيل</h2>
        <div className="reg-element">
          <IonInput type="text" className="reg-input" placeholder="الاسم" />
        </div>
        <div className="reg-element">
          <IonInput
            type="email"
            className="reg-input"
            placeholder="البريد الاكتروني"
          />
        </div>

        <div className="reg-element">
          <IonInput
            type="password"
            className="reg-input"
            placeholder=" كلمة المرور"
          />
        </div>

        <div className="reg-element">
          <IonInput
            type="password"
            className="reg-input"
            placeholder=" تأكيد كلمة المرور"
          />
        </div>

        <div className="reg-element">
          <IonInput type="tel" className="reg-input" placeholder=" الهاتف" />
        </div>

        <div className="reg-element">
          <IonInput
            type="text"
            className="reg-input"
            placeholder=" معرف الاقامة"
          />
        </div>
        <div className="reg-element">
          <IonDatetime
            displayFormat="DD-MM-YYYY"
            placeholder="تاريخ الميلاد"
            value={selectedDate}
            className="reg-input"
            onIonChange={(e) => setSelectedDate(e.detail.value!)}
          ></IonDatetime>
        </div>
        <div className="reg-element">
          <IonSelect
            value={gender}
            placeholder="الحالة الاجتماعية"
            className="reg-input"
            onIonChange={(e) => setGender(e.detail.value)}
          >
            <IonSelectOption value="female">Female</IonSelectOption>
            <IonSelectOption value="male">Male</IonSelectOption>
          </IonSelect>
        </div>
        <div className="reg-element">
          <IonButton type="submit" expand="block" className="reg-btn">
            تسجيل
          </IonButton>
        </div>
      </form>
    </div>
  );
}

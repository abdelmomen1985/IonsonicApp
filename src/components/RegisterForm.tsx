import React from "react";

export default function RegisterForm() {
  return (
    <div>
      <form>
        <h2 className="title ion-margin">التسجيل</h2>
        <div className="reg-element">
          <input type="text" className="reg-input" placeholder="الاسم الاول" />
        </div>
        <div className="reg-element">
          <input type="text" className="reg-input" placeholder="الاسم الاخير" />
        </div>
        <div className="reg-element">
          <input
            type="text"
            className="reg-input"
            placeholder="البريد الاكتروني"
          />
        </div>
        <div className="reg-element">
          <input type="text" className="reg-input" placeholder=" الهاتف" />
        </div>
      </form>
    </div>
  );
}

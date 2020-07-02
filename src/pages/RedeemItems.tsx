import React, { useContext, useEffect, useState } from "react";
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonChip,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import Footer from "../components/Footer";
import { AppCtxt } from "../Context";
import { strings } from "../localization/localization";
import { RouteComponentProps } from "react-router";
import EveryHeader from "../components/EveryHeader";
import { getLangId } from "../utils/functions";
import config from "../config";
import { GiftItem } from "../types/types";
import moment from "moment";
import { bulbOutline } from "ionicons/icons";
import voucherImg from "../images/voucher.png";

export default function RedeemItems({ match }: RouteComponentProps) {
  const { currentLang, user } = useContext(AppCtxt);
  const { what } = match.params as any;
  const [items, setItems] = useState<GiftItem[]>([]);
  useEffect(() => {
    const getItems = async () => {
      const langId = getLangId(currentLang!);
      if (what === "gifts") {
        let resp = await fetch(
          `${config.API_URL}ManageCustomer/GetAllUserGifts?LanguageId=${langId}&UserId=${user.Id}&CountryId=0`
        );
        let { Data } = await resp.json();
        console.log(Data?.GiftList);
        // Set Type
        const items = (Data?.GiftList as GiftItem[]).map((item) => ({
          ...item,
          type: "gift",
        }));
        setItems(items);
      } else if (what === "p_products") {
        let resp = await fetch(
          `${config.API_URL}ManageGeneralData/GetAllProduct?PageIndex=1&LanguageId=${langId}&PageSize=100`
        );
        let { Data } = await resp.json();
        // Then cast each product
        const items = (Data?.products as any[]).map(
          (product) =>
            ({
              id: product.Id,
              name: product.Description,
              walts: product.Price,
              image: product.Image,
              type: "p_product",
            } as GiftItem)
        );
        setItems(items);
      } else if (what === "vouchers") {
        let resp = await fetch(
          `${config.API_URL}ManageCustomer/GetAllUserVouchers?LanguageId=${langId}&UserId=${user.Id}&CountryId=0`
        );
        let { Data } = await resp.json();
        console.log(Data);
        const items = (Data?.VoucherList as GiftItem[]).map((item) => ({
          ...item,
          type: "voucher",
          image: voucherImg,
        }));

        setItems(items);
      }
    };
    getItems();
  }, [what, user, currentLang]);

  return (
    <IonPage style={{ direction: currentLang === "ar" ? "rtl" : "ltr" }}>
      <EveryHeader title={strings.offers.redeem} />
      {/**
      <IonHeader>
        <IonToolbar color="dark" className="main-toolbar">
          <IonButtons slot="start">
            <IonMenuToggle>
              <img src={menuIcon} alt="" />
            </IonMenuToggle>
          </IonButtons>
          <IonButtons slot="end">
            <IonIcon slot="icon-only" icon={cardOutline} color="light" />
          </IonButtons>
          <IonTitle> {strings.offers.redeem} </IonTitle>
        </IonToolbar>
      </IonHeader>
 */}
      <IonContent className="redeem-ctg-bg">
        <div className="ion-text-center ion-margin">
          <IonChip
            color="tertiary"
            style={{ backgroundColor: "#dedede", fontSize: "1.2em" }}
          >
            <IonIcon icon={bulbOutline} />
            <IonLabel>
              {strings.watts.available} : {user.walts}
            </IonLabel>
          </IonChip>
        </div>
        {items.map((item) => (
          <IonCard key={item.id}>
            <IonCardHeader color="tertiary">
              <IonText className="c-head-text" color="light">
                {item.name} - ( {item.walts} {strings.watts.title} )
              </IonText>
            </IonCardHeader>
            <IonGrid>
              <IonRow>
                <IonCol size="7" className="ion-text-center">
                  <IonCardSubtitle class="ion-padding">
                    {strings.main.expiry_date} :
                    {moment(item.expire_date).format("YYYY/MM/DD")}
                  </IonCardSubtitle>
                  <IonButton disabled={+user.walts < +item.walts}>
                    {strings.main.redeem}
                  </IonButton>
                </IonCol>
                <IonCol size="5">
                  <img
                    src={
                      item.type === "gift"
                        ? "https://i.imgur.com/oqMGUjf.jpg"
                        : item.image
                    }
                    alt=""
                    style={{ borderRadius: "13px" }}
                  />
                </IonCol>
              </IonRow>
            </IonGrid>
          </IonCard>
        ))}
      </IonContent>
      <Footer current="redeem_ctg" />
    </IonPage>
  );
}

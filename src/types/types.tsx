export type UserType = {
  Id: number;
  Email: string;
  Password: string;
  BirthDate: string;
  CityId: string;
  FirstName: string;
  LastName: string;
  MaterialStatusId: number;
  UserName: string;
  Phone: string;
  ProfileImage: string;
  barcode: string;
  cart: string;
  ResidencyId: string;
  // TODO remove [later]
  walts: string;
};

export type OfferType = {
  Id: number;
  Description: string;
  Image: string;
  ProductionDate: string;
  Model: string;
  DiscountAmount: number;
  DiscountPercent: number;
  OriginalPrice: number;
  PriceWithDiscount: number;
};

export type AreaType = {
  Id: number;
  Name: string;
  Longitude: number;
  Latitude: number;
};

export type ContactUsType = {
  Id: number;
  UserName: string;
  TypeId: number;
  Details: string;
  Images: [{ Image: string }];
};

export type NewsType = {
  Id: number;
  TitleAr: string;
  TitleEn: string;
  TitleInd: string;
  TitleUrd: string;
  TitleBng: string;

  DescAr: string;
  DescEn: string;
  DescInd: string;
  DescUrd: string;
  DescBng: string;
  CreatedDate: string;

  Images: [{ Image: string }];
};

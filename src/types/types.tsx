export type UserType = {
  Id: number;
  Email: string;
  Password: string;
  BirthDate: string;
  CityId: number;
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
  type: string;
  active: boolean;
};

export type AppDataType = {
  Banners: [{ Image: string; Name: string; Id: number }];
  ContactUs: {
    Activity: string;
    Address: string;
    Description: string;
    Email: string;
    Name: string;
    Fax: string;
    Phone: string;
  };
  HowItWork: string;
  Privacy: string;
  TermAndConditions: string;
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

export type BranchType = {
  Id: number;
  Name: string;
  AreaId: number;
  AreaName: string;
  BranchManager: string;
  Description: string;
  Icon: string;
  Image: string;
  Mobile: string;
  Phone: string;
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

export type GiftItem = {
  id: number;
  name: string;
  description: string;
  expire_date: string;
  image: string;
  // TODO remove [later]
  walts: number;
  type: string;
  CRUD: string;
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

  NewsImages: [{ Image: string }];
};

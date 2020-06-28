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

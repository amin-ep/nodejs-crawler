export default interface IWebsite {
  name: string;
  domain: string;
  city: string;
  starRating: number;
  expirationDate: string;
}

export type CityStats = {
  _id: string;
  count: number;
  data: IWebsite;
};

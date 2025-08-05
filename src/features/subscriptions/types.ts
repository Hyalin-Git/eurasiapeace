export interface Subscription {
  id: number;
  title: string;
  price: string;
  duration: string;
  buttonText: string;
  moreInfo: string;
  services: string[];
  color: "forceBlue" | "purple";
  lookup_key: string;
}

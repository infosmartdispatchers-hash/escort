export interface Companion {
  id: string;
  name: string;
  location: string;
  price: string;
  featured: boolean;
  image: string;
  gallery?: string[];
  specialty?: string;
  height?: string;
  bodyType?: string;
  breastSize?: string;
  eyeColor?: string;
  paymentMethods?: string[];
  bio?: string;
  tags?: string[];
}

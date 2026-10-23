export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: "logo" | "exterior";
};

export type Product = {
  id: string;
  name: string;
  unit?: string;
  price?: number;
};

export type DayKey =
  "sunday" | "monday" | "tuesday" | "wednesday" | "thursday" | "friday" | "saturday";

export type DayHours = {
  opens: string;
  closes: string;
};

export type WeeklyHours = Record<DayKey, DayHours | null>;

export type BusinessAddress = {
  street: string;
  kelurahan: string;
  kecamatan: string;
  city: string;
  province: string;
};

export type Business = {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  metaTitleSuffix: string;
  established: number;
  address: BusinessAddress;
  geo: {
    latitude: number;
    longitude: number;
  };
  phoneDisplay: string;
  phoneE164: string;
  whatsapp: string;
  mapsUrl: string;
  serviceArea: string;
  logo?: Photo;
  photos: Photo[];
  products: Product[];
  hours: WeeklyHours | null;
  reviewsUrl?: string;
  keywords: string[];
  order: number;
};

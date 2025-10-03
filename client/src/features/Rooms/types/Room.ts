export interface Room {
  _id: string;
  name: string;
  description: string;
  thumbnail: string;
  images: string[];
  isAvailable: boolean;
  capacity: { guests: number; rooms: number };
  extras: { name: string; price: number }[];
  pricePerNight: number;
  location: { country: string; city: string; address: string };
  rating: number;
  reviewsCount: number;
  createdAt: string;
  updatedAt: string;
}

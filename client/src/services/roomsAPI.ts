import api from "../libs/api";

// Room type based on server's room model
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

export async function getRooms(
  queryString: string = ""
): Promise<{ resultLength: number; rooms: Room[] }> {
  const res = await api.get(`/room?${queryString}`);
  return res.data;
}

export async function searchRooms(
  query: string
): Promise<{ resultLength: number; rooms: Room[] }> {
  const res = await api.get(`/room?search=${query}`);
  return res.data;
}

export async function getRoomDetails(id: string): Promise<{ room: Room }> {
  const res = await api.get(`/room/${id}`);
  return res.data;
}

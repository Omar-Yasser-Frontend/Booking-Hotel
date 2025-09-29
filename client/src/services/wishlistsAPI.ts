import api from "../libs/api";

// Wishlist type based on server's wishlist model
export interface Wishlist {
  _id: string;
  roomId: string;
  userId: string;
}

export async function getWishlists(): Promise<{ wishlists: Wishlist[] }> {
  const res = await api.get("/wishlist");
  return res.data;
}

export async function createWishlist(data: {
  roomId: string;
}): Promise<{ wishlist: Wishlist }> {
  const res = await api.post("/wishlist", data);
  return res.data;
}

export async function deleteWishlist(id: string): Promise<null> {
  const res = await api.delete(`/wishlist/${id}`);
  return res.data;
}

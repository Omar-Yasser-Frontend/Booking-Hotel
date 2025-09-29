import api from "../libs/api";

// Reservation type based on server's reservation model
export interface Reservation {
  _id: string;
  roomId: string;
  userId: string;
  intentId: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  nightsCount: number;
  extras: { name: string; price: number }[];
  status: "paid" | "canceled" | "check-in" | "check-out";
}

export async function getReservations(): Promise<{
  reservations: Reservation[];
}> {
  const res = await api.get("/reservation");
  return res.data;
}

export async function createReservation(data: {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  extras: string[];
}): Promise<{ client_secret: string }> {
  const res = await api.post("/payment/intent", data);
  return res.data;
}

export async function cancelReservation(
  id: string
): Promise<{ reservation: Reservation }> {
  const res = await api.delete(`/reservation/${id}`);
  return res.data;
}

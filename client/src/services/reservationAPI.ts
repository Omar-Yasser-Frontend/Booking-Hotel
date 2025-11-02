import type { QueryFunctionContext } from "@tanstack/react-query";
import api from "../libs/api";

// Reservation type based on server's reservation model
export interface Reservation {
  roomId: string;
  userId: string;
  intentId: string;
  checkIn: Date;
  checkOut: Date;
  totalPrice: number;
  nightsCount: number;
  extras: { name: string; price: number }[];
  notes: string;
  guests: number;
  room: number;
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
  notes: string;
  guests: number;
  room: number;
}): Promise<{ client_secret: string }> {
  const res = await api.post("/payment/intent", data);
  return res.data;
}

export async function cancelReservation(
  id: string,
): Promise<{ reservation: Reservation }> {
  const res = await api.delete(`/reservation/${id}`);
  return res.data;
}

export async function getReservedDates(
  context: QueryFunctionContext,
): Promise<{ dates: { from: Date; to: Date }[] }> {
  const [, roomId] = context.queryKey;
  const res = await api.get(`/reservation/dates/${roomId}`);

  return res.data;
}

export async function getReceipte(context: QueryFunctionContext): Promise<{
  receipte: {
    checkIn: string;
    checkOut: string;
    nightsCount: string;
    totalPrice: string;
    url: string;
  };
}> {
  const [, intentId] = context.queryKey;
  const res = await api.get("/payment/intent/" + intentId);

  return res.data;
}

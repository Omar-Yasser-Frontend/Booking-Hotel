import type { QueryFunctionContext } from "@tanstack/react-query";
import api from "../libs/api";
import type { Room } from "../features/Rooms/types/Room";

export async function getRooms(
  context: QueryFunctionContext,
): Promise<{ resultLength: number; rooms: Room[]; roomsCount: number }> {
  const res = await api.get(`/room?${context.queryKey[1]}`);

  return res.data;
}

export async function searchRooms(
  query: string,
): Promise<{ resultLength: number; rooms: Room[] }> {
  const res = await api.get(`/room/search?search=${query}`);
  return res.data;
}

export async function getRoomDetails(
  context: QueryFunctionContext,
): Promise<{ room: Room }> {
  const [, id] = context.queryKey;
  const res = await api.get(`/room/${id}`);
  return res.data;
}

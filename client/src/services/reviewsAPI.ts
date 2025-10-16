import type { QueryFunctionContext } from "@tanstack/react-query";
import api from "../libs/api";

type UserPopulated = {
  userId: { _id: string; username: string; image?: string };
};

export type Review = {
  _id: string;
  roomId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
};

type ReviewPopulated = Omit<Review, "userId"> & UserPopulated;

export async function getReviews(
  pageParam: number,
  roomId: string,
): Promise<{
  reviews: ReviewPopulated[];
  nextPage: number;
  resultLength: number;
}> {
  console.log(pageParam);
  console.log(roomId);

  const res = await api.get(`/review/${roomId}?page=${pageParam}`);
  return res.data;
}

export async function getReviewsAvg(context: QueryFunctionContext): Promise<{
  reviewsAvg: {
    perRating: { _id: number; count: number }[];
    avgRating?: number;
    totalReviews?: number;
  };
}> {
  const [, roomId] = context.queryKey;
  const res = await api.get(`/review/avg/${roomId}`);
  return res.data;
}

export async function updateReviews(data: {
  id: string;
  review: {
    rating?: number;
    comment?: string;
  };
}): Promise<{ review: Review }> {
  const res = await api.put(`/review/${data.id}`, data.review);
  return res.data;
}

export async function deleteReview(id: string): Promise<null> {
  const res = await api.delete(`/review/${id}`);
  return res.data;
}

export async function createReview(data: {
  roomId: string;
  rating: number;
  comment: string;
}): Promise<{ review: Review }> {
  const res = await api.post(`/review`, data);
  return res.data;
}

export async function getMyReviews(pageParams: number): Promise<{
  reviews: ReviewPopulated[];
  nextPage: number;
  resultLength: number;
}> {
  const res = await api.get(`/review/me?page=${pageParams}`);

  return res.data;
}

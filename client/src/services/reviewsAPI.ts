import api from "../libs/api";

// Review type based on server's reviews model
export interface Review {
  _id: string;
  roomId: string;
  userId: string;
  rating: number;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export async function getReviews(
  roomId: string
): Promise<{ reviews: Review[]; page: number; resultLength: number }> {
  const res = await api.get(`/review/${roomId}`);
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

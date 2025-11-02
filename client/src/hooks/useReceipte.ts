import { useQuery } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router";
import { getReceipte } from "../services/reservationAPI";

export function useReceipte() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = useQuery({
    queryKey: ["receipte", searchParams.get("payment_intent")],
    queryFn: getReceipte,
  });

  if (!searchParams.get("payment_intent")) navigate("/");

  return query;
}

import { createContext, useContext } from "react";
import type { User } from "../services/userAPI";

export const UserContext = createContext<null | User>(null);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) throw new Error("Can't use useUser outside UserProvider");
  return context;
}

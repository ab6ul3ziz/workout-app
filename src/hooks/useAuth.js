import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw Error("useAuth must be used in Authcontextprovider");
  return context;
}

import useWorkouts from "./useWorkouts";

export default function useGetuserId() {
  return localStorage.getItem("userId");
}

import { useContext, useEffect, useState } from "react";
import { WorkoutContext } from "../context/WorkoutContext";
import useAuth from "./useAuth";

export default function useWorkouts() {
  const { workouts, savedWorkouts, dispatch } = useContext(WorkoutContext);
  const { user } = useAuth();

  const fetchWorkout = async () => {
    try {
      const res = await fetch(
        "https://workouts-api-xlbz.onrender.com/api/workout",
        {
          headers: {
            Authorizaion: `Bearer ${user.token}`,
          },
        }
      );
      const data = await res.json();
      if (res.ok) dispatch({ type: "SET_WORKOUTS", payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  const getSaved = async () => {
    try {
      const res = await fetch(
        `https://workouts-api-xlbz.onrender.com/api/workout/${user.userId}/saved`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorizaion: `Bearer ${user.token}`,
          },
        }
      );
      const json = await res.json();
      if (res.ok) {
        dispatch({ type: "SET_SAVED_WORKOUTS", payload: json });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { fetchWorkout, workouts, getSaved, savedWorkouts, dispatch };
}

import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useWorkouts from "../hooks/useWorkouts";

export default function SavedWorkouts() {
  const { savedWorkouts } = useWorkouts();

  return (
    <>
      <h1>saved here</h1>
      {savedWorkouts &&
        savedWorkouts.map((workout, i) => (
          <div key={workout._id} className="workout-details">
            <h4>{workout.title}</h4>
            <p>
              <strong>load(kg):</strong>
              {workout.load}
            </p>
            <p>
              <strong> Reps:</strong>

              {workout.reps}
            </p>
            <p>{workout.createdAt}</p>
          </div>
        ))}
    </>
  );
}

import { useEffect, useState } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import Form from "../components/Form";
import useWorkouts from "../hooks/useWorkouts";
import useAuth from "../hooks/useAuth";

export default function Home() {
  const { workouts, fetchWorkout, getSaved, savedWorkouts } = useWorkouts();
  useEffect(() => {
    fetchWorkout();
  }, []);
  useEffect(() => {
    getSaved();
  }, []);
  return (
    <div className="home">
      <div className="workouts">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))}
      </div>
      <Form />
    </div>
  );
}

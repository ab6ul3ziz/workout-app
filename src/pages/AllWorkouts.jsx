import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import WorkoutDetails from "../components/WorkoutDetails";

export default function AllWorkouts() {
  const [workouts, setWorkouts] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const getAllWorkouts = async () => {
      try {
        const res = await fetch(
          "https://workouts-buddy.onrender.com/api/workout/all",
          {
            headers: {
              "Content-Type": "application/json",
              Authorizaion: `Bearer ${user.token}`,
            },
          }
        );
        const json = await res.json();
        if (res.ok) setWorkouts([...json]);
      } catch (error) {
        console.log(error);
      }
    };
    getAllWorkouts();
  }, [user.token]);
  return (
    <>
      {workouts.map((workout, key) => (
        <div key={key} className="workout-details">
          <h4>{workout.title}</h4>
          <p>
            <strong>load(kg):</strong>
            {workout.load}
          </p>
          <p>
            <strong> Reps:</strong>

            {workout.reps}
          </p>
          <strong
            style={{
              display: "flex",
              justifyContent: "right",
              cursor: "pointer",
            }}
          ></strong>
        </div>
      ))}
    </>
  );
}

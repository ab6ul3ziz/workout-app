import useWorkouts from "../hooks/useWorkouts";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
export default function WorkoutDetails({ workout }) {
  const { dispatch, savedWorkouts, fetchWorkout, getSaved } = useWorkouts();
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();
  useEffect(() => {
    setIsSaved(savedWorkouts.map((w) => w._id).includes(workout._id));
  }, [savedWorkouts, workout._id]);
  async function handleSave(workoutId) {
    const { userId } = user;
    try {
      const res = await fetch(
        "https://workouts-api-xlbz.onrender.com/api/workout/save",
        {
          method: "PUT",
          body: JSON.stringify({ userId, workoutId }),
          headers: {
            "Content-Type": "application/json",
            Authorizaion: `Bearer ${user.token}`,
          },
        }
      );

      const json = await res.json();
      dispatch({ type: "SAVE_WORKOUT", payload: [json] });
    } catch (error) {
      console.log(error);
    }
  }
  async function handleClick(e) {
    e.preventDefault();
    if (!user) {
      return;
    }
    const res = await fetch(
      `https://workouts-api-xlbz.onrender.com/api/workout/${workout._id}`,
      {
        method: "DELETE",
        headers: {
          Authorizaion: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: json });
    }
  }
  async function handleUnSave(workoutId) {
    if (!user) {
      return;
    }
    const res = await fetch(
      `https://workouts-api-xlbz.onrender.com/api/workout/${user.userId}/${workoutId}`,
      {
        method: "DELETE",
        headers: {
          Authorizaion: `Bearer ${user.token}`,
        },
      }
    );
    const json = await res.json();
    if (res.ok) {
      dispatch({ type: "UNSAVE_WORKOUT", payload: workoutId });
      getSaved();
    }
  }
  return (
    <div className="workout-details">
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
      <span onClick={handleClick} style={{ scale: "1.7" }}>
        🗑
      </span>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row-reverse",
        }}
      >
        {}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {workout.image.map((img) => (
            <img
              key={img._id}
              src={img.url}
              alt=""
              style={{ width: "100px" }}
            />
          ))}
        </div>
        {!isSaved ? (
          <button
            style={{
              display: "flex",
              justifyContent: "right",
              cursor: "pointer",
            }}
            onClick={() => handleSave(workout._id)}
          >
            save
          </button>
        ) : (
          <button
            style={{
              display: "flex",
              justifyContent: "right",
              cursor: "pointer",
            }}
            onClick={() => handleUnSave(workout._id)}
          >
            unsave
          </button>
        )}
      </div>
    </div>
  );
}

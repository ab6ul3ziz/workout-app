import { useState } from "react";
import useWorkouts from "../hooks/useWorkouts";
import useAuth from "../hooks/useAuth";

export default function Form() {
  const [title, setTitle] = useState("");
  const [reps, setReps] = useState("");
  const [load, setLoad] = useState("");
  const [emptyFields, setEmptyFields] = useState([]);
  const { workouts, dispatch } = useWorkouts();
  const { user } = useAuth();

  const [error, setError] = useState(null);
  async function handleCreateWorkout(e) {
    e.preventDefault();
    if (!user) {
      setError("you must be logged in");
      return;
    }
    const workout = {
      title,
      load,
      reps,
    };

    const res = await fetch("https://workouts-buddy.onrender.com/api/workout", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
        Authorizaion: `Bearer ${user.token}`,
      },
    });

    const json = await res.json();
    if (!res.ok) {
      setEmptyFields(json.emptyFields);
      setError(json.error);
    }
    if (res.ok) {
      dispatch({ type: "CREATE_WORKOUT", payload: json });
      setEmptyFields([]);
      setTitle("");
      setReps("");
      setLoad("");
      setError(null);
    }
  }
  return (
    <form className="create" onSubmit={handleCreateWorkout}>
      <h3>add new workout</h3>

      <label>Title</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={
          emptyFields && emptyFields.includes("title") ? "error" : undefined
        }
      />

      <label>Load (In Kg)</label>
      <input
        type="text"
        onChange={(e) => setLoad(e.target.value)}
        value={load}
        className={
          emptyFields && emptyFields.includes("load") ? "error" : undefined
        }
      />

      <label>reps</label>
      <input
        type="text"
        onChange={(e) => setReps(e.target.value)}
        value={reps}
        className={
          emptyFields && emptyFields.includes("reps") ? "error" : undefined
        }
      />
      <button>add workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
}

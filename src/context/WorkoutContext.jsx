import { createContext, useReducer } from "react";
export const WorkoutContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_WORKOUTS":
      return { ...state, workouts: action.payload };
    case "CREATE_WORKOUT": {
      return { ...state, workouts: [action.payload, ...state.workouts] };
    }
    case "DELETE_WORKOUT": {
      return {
        ...state,
        workouts: state.workouts.filter((w) => w._id !== action.payload._id),
      };
    }
    case "SAVE_WORKOUT": {
      return {
        ...state,
        savedWorkouts: [...state.savedWorkouts, ...action.payload],
      };
    }
    case "SET_SAVED_WORKOUTS": {
      return {
        ...state,
        savedWorkouts: [...action.payload],
      };
    }
    case "UNSAVE_WORKOUT": {
      return {
        ...state,
        savedWorkouts: state.savedWorkouts.filter(
          (w) => w._id !== action.payload.workoutId
        ),
      };
    }
    default:
      return state;
  }
};
export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    workouts: null,
    savedWorkouts: [],
  });
  return (
    <WorkoutContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutContext.Provider>
  );
};

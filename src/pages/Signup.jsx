import { useState } from "react";
import useSignup from "../hooks/useSignup";

export default function Sinup() {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");

  const { signup, isLoading, error } = useSignup();
  async function handleSubmit(e) {
    e.preventDefault();

    await signup(email, password);
  }
  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h3>sign up</h3>

      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEamil(e.target.value)}
      />

      <label>password</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>sign up</button>
      {error && <div className="error"> {error}</div>}
    </form>
  );
}

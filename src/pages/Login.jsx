import { useState } from "react";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const [email, setEamil] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  async function handleSubmit(e) {
    e.preventDefault();
    await login(email, password);
  }
  return (
    <form className="login" onSubmit={handleSubmit}>
      <h3>login</h3>
      <label>Email</label>
      <input
        autoComplete="current-email"
        type="email"
        value={email}
        onChange={(e) => setEamil(e.target.value)}
      />

      <label>password</label>
      <input
        autoComplete="current-password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={isLoading}>login</button>
      {error && <div className="error"> {error}</div>}
    </form>
  );
}

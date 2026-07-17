import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { loginUser } from "../api/auth";

function Login() {
  const navigate = useNavigate();

  const { logIn } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

 async function handleLogin() {
    try {
      setError("");

      const data = await loginUser(email, password);

      logIn(data.user);

      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("something is wrong");
      }
    }}

    return (
      <div>
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br />
        <br />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br />
        <br />

        {error && <p style={{ color: "red" }}>{error}</p>}

        <button onClick={handleLogin}>Login</button>
      </div>
    );
  
}
export default Login;

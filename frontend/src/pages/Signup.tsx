import { useState } from "react";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { signUpUser } from "../api/auth";

function Signup() {
  const navigate = useNavigate();
  const { logIn } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  async function handleSignUp() {
    try {
      setError("");
      const data = await signUpUser(name, email, password);

      logIn(data.user);

      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("something is wrong");
      }
    }
  }

  return (
    <div>
      <h2>SignUp</h2>
      <input
        type="text"
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />

      <input
        type="email"
        placeholder="Email "
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
      <button onClick={handleSignUp}>Sign up</button>
    </div>
  );
}

export default Signup;

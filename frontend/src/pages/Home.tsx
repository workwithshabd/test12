import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

function Home() {
  const navigate = useNavigate();

  const { logOut } = useAuth();

  function handleLogOut() {
    logOut();
    navigate("/");
  }

  return (
    <div>
      <h2>Home Page</h2>

      <button onClick={handleLogOut}>Log Out</button>
    </div>
  );
}

export default Home;

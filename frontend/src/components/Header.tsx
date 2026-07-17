
import { useAuth } from "../Context/AuthContext";

function Header() {
  const { loggedIn , user} = useAuth() ;

  return (
    <header className="bg-amber-500 header">
      {!loggedIn ? <h1>welcome </h1> : <h1>welcome ,{user?.name}</h1>}
    </header>
  );
}

export default Header;

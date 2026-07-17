import { Link } from "react-router-dom";

function Landing(){
    return (
      <div>
        <Link to="/login">
        <button>Login</button>
        </Link>

        <Link to="/signup">
        <button>Signup</button>
        </Link>
      </div>
    );
}

export default Landing;
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="bg-slate-200">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold">Auth App</h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <li>
            {currentUser ? (
              <Link to="/profile">
                <img
                  className="h-8 w-8 rounded-full object-cover"
                  src={currentUser.profilePicture}
                  alt="user profile picture"
                  referrerPolicy="no-referrer"
                />
              </Link>
            ) : (
              <Link to="/sign-in">Sign-in</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}

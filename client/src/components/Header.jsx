import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    if (searchTermFromUrl) return setSearchTerm(searchTermFromUrl);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  return (
    <header className="bg-slate-200 shadow-md">
      <div className="m-auto flex max-w-6xl items-center justify-between p-3">
        <Link to="/">
          <h1 className="flex flex-wrap text-sm font-bold sm:text-xl">
            <span className="text-slate-500">Ready</span>
            <span className="text-slate-700">Deal</span>
          </h1>
        </Link>
        <form
          onSubmit={handleSubmit}
          className="flex items-center rounded-lg bg-slate-100 p-3"
        >
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            type="text"
            placeholder="Search..."
            className="w-24 bg-transparent focus:outline-none sm:w-64"
          />
          <button>
            <FaSearch className="text-slate-500" />
          </button>
        </form>
        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden text-slate-700 hover:underline sm:inline">
              Home
            </li>
          </Link>
          <Link to="/about">
            <li className="hidden text-slate-700 hover:underline sm:inline">
              About
            </li>
          </Link>
          <Link to="/profile">
            {currentUser ? (
              <img
                className="h-7 w-7 rounded-full object-cover"
                src={currentUser.avatar}
                alt="profile"
              />
            ) : (
              <li className="text-slate-700 hover:underline">Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}

import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          className="mt-2 h-24 w-24 self-center rounded-full object-cover"
          src={currentUser.avatar}
          alt="profile"
        />
        <input
          id="username"
          type="text"
          placeholder="username"
          className="rounded-lg p-3"
        />
        <input
          id="email"
          type="email"
          placeholder="email"
          className="rounded-lg p-3"
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="rounded-lg p-3"
        />
        <button className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80">
          update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete account</span>
        <span className="text-red-700 cursor-pointer"> sign out</span>
      </div>
    </div>
  );
}

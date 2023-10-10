import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import {
  updateUserStart,
  updateUserSucces,
  updateUserFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser, isLoading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, avatar: downloadURL });
        });
      },
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(res);
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSucces(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          className="mt-2 h-24 w-24 self-center rounded-full object-cover hover:cursor-pointer"
          src={formData.avatar || currentUser.avatar}
          alt="profile"
        />
        <p className="self-center text-sm">
          {fileUploadError ? (
            <span className="text-red-700">Error image upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">Uploading {filePerc}%</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image upload completed</span>
          ) : (
            ""
          )}
        </p>
        <input
          id="username"
          type="text"
          defaultValue={currentUser.username}
          placeholder="username"
          className="rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          id="email"
          type="email"
          defaultValue={currentUser.email}
          placeholder="email"
          className="rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          id="password"
          type="password"
          placeholder="password"
          className="rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          disabled={isLoading}
          className="rounded-lg bg-slate-700 p-3 uppercase text-white hover:opacity-95 disabled:opacity-80"
        >
          {isLoading ? "Loading..." : "update"}
        </button>
      </form>
      <div className="mt-5 flex justify-between">
        <span className="cursor-pointer text-red-700">Delete account</span>
        <span className="cursor-pointer text-red-700"> sign out</span>
      </div>
      <p className="mt-5 text-center text-red-700">{error ? error : ""}</p>
      <p className="mt-5 text-center text-green-700">
        {updateSuccess ? "User is successfully  updated! " : ""}
      </p>
    </div>
  );
}

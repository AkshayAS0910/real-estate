import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  console.log(formData);

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

  return (
    <div className="mx-auto max-w-lg p-3">
      <h1 className="my-7 text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
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
      <div className="mt-5 flex justify-between">
        <span className="cursor-pointer text-red-700">Delete account</span>
        <span className="cursor-pointer text-red-700"> sign out</span>
      </div>
    </div>
  );
}

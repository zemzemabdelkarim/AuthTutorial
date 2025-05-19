import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (image) {
      hanleFileUpload(image);
    }
  }, [image]);

  const hanleFileUpload = async (image) => {
    console.log(image);

    /*try {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          //console.log(`Upload is ${progress}% done`);
          setImagePercentage(Math.round(progress));
        },
        (error) => {
          console.log(error);

          setImageError(true);
          console.log(`imageError = ${imageError}`);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFormData({ ...formData, profilePicture: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageError(true);
      console.log(`imageError = ${imageError}`);
    }
    console.log(imageError);
    */
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          //src={formData.profilePicture || currentUser.profilePicture}
          src={currentUser.profilePicture}
          alt="profile picture"
          className="
          self-center
          h-24
          w-24
          cursor-pointer
          rounded-full
          object-cover
          mt-2"
          onClick={() => fileRef.current.click()}
        />
        <p className="text-sm self-center">
          {imageError ? (
            <span className="text-red-700">Error uploading image</span>
          ) : imagePercentage > 0 && imagePercentage < 100 ? (
            <span className="text-slate-700">
              {`Uploading: ${imagePercentage}%...`}
            </span>
          ) : imagePercentage === 100 ? (
            <span className="text-green-700">{"Uploading complete!"}</span>
          ) : (
            ""
          )}
        </p>
        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          name="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          className="
          bg-slate-100
          rounded-lg
          p-3
          "
        />
        <button
          className="
        bg-slate-700
        text-white
        p-3
        rounded-lg
        uppercase
        hover:opacity-95
        disabled:opacity-80
        "
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete account</span>
        <span className="text-red-700">Sign out</span>
      </div>
    </div>
  );
}

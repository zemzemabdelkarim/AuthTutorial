import { useSelector } from "react-redux";
import { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
} from "../redux/user/userSlice";
/*import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
*/
export default function Profile() {
  const fileRef = useRef(null);
  const [image, setImage] = useState(undefined);
  const [imagePercentage, setImagePercentage] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (image) {
      hanleFileUpload(image);
    }
  }, [image]);

  const hanleFileUpload = async (image) => {
    try {
      const imageForm = new FormData();
      imageForm.append("image", image);

      const res = await fetch("/api/user/updatePicture", {
        method: "POST",
        body: imageForm,
      });

      const response = await res.json();
      setFormData({
        ...formData,
        profilePicture: `/api/public/${response.filename}`,
      });
    } catch (error) {
      setImageError(true);
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart())
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(!data.success){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error))
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <img
          src={formData.profilePicture || currentUser.profilePicture}
          //src={currentUser.profilePicture}
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
          onChange={handleChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
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
          onChange={handleChange}
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
          {loading ? 'loading...' : 'Update'}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700">Delete account</span>
        <span className="text-red-700">Sign out</span>
      </div>
     <p className="text-red-700 mt-5">{error && 'Something went wrong!'}</p> 
     <p className="text-green-700 mt-5">{updateSuccess && 'user is updated successfully'}</p> 
    </div>
  );
}

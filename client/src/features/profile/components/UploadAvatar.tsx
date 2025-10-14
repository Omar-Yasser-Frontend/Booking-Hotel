import { CiCamera } from "react-icons/ci";
import React, { useState } from "react";
import PrimaryBtn from "../../../components/PrimaryBtn";
import { useUploadAvatar } from "../hooks/useUploadAvatar";
import toast from "react-hot-toast";

interface UploadAvatarProps {
  image: string;
}

function UploadAvatar({ image }: UploadAvatarProps) {
  const { mutate: uploadAvatar, isPending } = useUploadAvatar();
  const [profilePic, setProfilePic] = useState<null | File>(null);

  function handleShowImage() {
    if (profilePic) return URL.createObjectURL(profilePic);
  }

  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!profilePic) return;

        const formData: FormData = new FormData();
        formData.set("profileImage", profilePic);
        uploadAvatar(formData, {
          onSuccess: () => {
            toast.success("Profile picture updated successfully");
            setProfilePic(null);
          },
        });
      }}
      encType="multipart/form-data"
    >
      <div className="">
        <div className="h-40 overflow-hidden rounded-md bg-[url('/images/joakim-nadell-K67sBVqLLuw-unsplash.jpg')] bg-cover bg-no-repeat"></div>
        <label
          htmlFor="profile-picture"
          className="relative mx-auto block w-fit cursor-pointer rounded-full ring-2 ring-green-400 ring-offset-2"
        >
          <img
            src={handleShowImage() || image || "/images/default-user.jpg"}
            alt="User Profile Image"
            className="relative mx-auto -mt-8 aspect-square w-20 rounded-full object-cover"
          />
          <div className="border-gray-main absolute -right-1 -bottom-1 block w-fit rounded-full border bg-white p-1">
            <CiCamera className="text-xl" />
            <input
              className="absolute h-0 w-0 opacity-0"
              type="file"
              id="profile-picture"
              accept="image/*"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                const file = e.target.files?.[0];

                if (file) setProfilePic(file);
                else setProfilePic(null);
              }}
            />
          </div>
        </label>
      </div>
      <PrimaryBtn
        isPending={isPending}
        className={`mx-auto my-8 block w-3/5 duration-300 ${profilePic ? "" : "pointer-events-none opacity-0"}`}
      >
        Submit
      </PrimaryBtn>
    </form>
  );
}

export default UploadAvatar;

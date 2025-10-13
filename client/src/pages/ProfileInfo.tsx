import UploadAvatar from "../features/profile/components/UploadAvatar";
import { useUser } from "../context/UserProvider";
import UpdateMeInfo from "../features/profile/components/UpdateMeInfo";

function ProfileInfo() {
  const { image } = useUser();

  return (
    <>
      <UploadAvatar image={image as string} />
      <UpdateMeInfo />
    </>
  );
}

export default ProfileInfo;

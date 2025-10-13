import { useRef, useState } from "react";
import { useUser } from "../../../context/UserProvider";
import { useUpdateMe } from "../hooks/useUpdateMe";
import PrimaryBtn from "../../../components/PrimaryBtn";
import FormInputs from "./FormInputs";

function UpdateMeInfo() {
  const user = useUser();
  const { mutate: updateMe, isPending } = useUpdateMe();
  const [error, setError] = useState("");
  const [username, setUsername] = useState(user.username);
  const usernameRef = useRef<null | HTMLInputElement>(null);

  return (
    <div>
      <form
        className="space-y-8"
        onSubmit={(e) => {
          e.preventDefault();
          if (
            typeof username !== "string" ||
            username.length < 3 ||
            username.length > 75
          ) {
            usernameRef.current?.focus();
            setError(
              "Username must be at least 3 letters and less than 75 letter",
            );
            return;
          }
          updateMe({ username });
        }}
      >
        <div className="flex items-center justify-between">
          <label htmlFor="">username: </label>
          <div>
            <FormInputs
              type="text"
              ref={usernameRef}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            {error && <p className="text-sm text-red-700">{error}</p>}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label htmlFor="">Email: </label>
          <div>
            <FormInputs type="text" value={user.email} disabled />
          </div>
        </div>

        <PrimaryBtn className="my-10" isPending={isPending}>
          Submit
        </PrimaryBtn>
      </form>
    </div>
  );
}

export default UpdateMeInfo;

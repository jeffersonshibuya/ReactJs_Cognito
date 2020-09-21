import React, { useCallback, useContext, useState } from "react";
import { AccountContext } from "./Accounts";

export default () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      getSession().then(({ user, email }) => {
        authenticate(email, password).then(() => {
          user.changePassword(password, newPassword, (err, result) => {
            if (err) console.error(err);
            console.log(result);
          });
        });
      });
    },
    [authenticate, getSession, newPassword, password]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Current Password"
        />
        <input
          type="text"
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          placeholder="New Password"
        />

        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

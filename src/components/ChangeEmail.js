import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useCallback, useContext, useState } from "react";
import { AccountContext } from "./Accounts";

export default () => {
  const [newEmail, setNewEmail] = useState("");
  const [password, setPassword] = useState("");

  const { getSession, authenticate } = useContext(AccountContext);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      getSession().then(({ user, email }) => {
        authenticate(email, password).then(() => {
          const attributes = [
            new CognitoUserAttribute({ Name: "email", Value: newEmail }),
          ];

          user.updateAttributes(attributes, (err, results) => {
            if (err) console.error(err);

            console.log(results);
          });
        });
      });
    },
    [authenticate, getSession, newEmail, password]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
          placeholder="E-mail"
        />
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />

        <button type="submit">Change E-mail</button>
      </form>
    </div>
  );
};

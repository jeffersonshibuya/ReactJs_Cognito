import React, { useCallback, useState, useContext } from "react";
import { AccountContext } from "./Accounts";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      authenticate(email, password)
        .then((data) => {
          console.log("Logged in!", data);
        })
        .catch((err) => {
          console.log("Failed to login!", err);
        });
    },
    [authenticate, email, password]
  );

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        type="text"
        placeholder="E-mail"
      />
      <input
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        type="text"
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
};

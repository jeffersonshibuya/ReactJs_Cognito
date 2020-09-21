import React, { useCallback, useState } from "react";
import UserPool from "../UserPool";

export default () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      UserPool.signUp(email, password, [], null, (err, data) => {
        if (err) console.error(err);

        console.log(data);
      });
    },
    [email, password]
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
      <button type="submit">Signup</button>
    </form>
  );
};

import React, { useState } from "react";
import { CognitoUser } from "amazon-cognito-identity-js";
import Pool from "../UserPool";
export default () => {
  const [email, setEmail] = useState("");
  const [stage, setState] = useState(1); // 1 - email stage; 2 - code stage

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const getUser = () => {
    return new CognitoUser({
      Username: email.toLocaleLowerCase(),
      Pool,
    });
  };

  const sendCode = (event) => {
    event.preventDefault();

    getUser().forgotPassword({
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.log("onFailure:", err);
      },
      inputVerificationCode: (data) => {
        console.log("Input Code:", data);
        setState(2);
      },
    });
  };

  const resetPassword = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      console.error("password are not the same");
      return;
    }

    getUser().confirmPassword(code, password, {
      onSuccess: (data) => {
        console.log("onSuccess:", data);
      },
      onFailure: (err) => {
        console.log("onFailure:", err);
      },
    });
  };

  return (
    <div>
      {stage === 1 && (
        <form onSubmit={sendCode}>
          <input
            type="text"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="E-mail"
          />
          <button type="submit">Send Verification Code</button>
        </form>
      )}

      {stage === 2 && (
        <form onSubmit={resetPassword}>
          <input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="Code"
          />
          <input
            type="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="New Password"
          />
          <input
            type="text"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm New Password"
          />
          <button type="submit">Change Password</button>
        </form>
      )}
    </div>
  );
};

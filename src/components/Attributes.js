import { CognitoUserAttribute } from "amazon-cognito-identity-js";
import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Accounts";

export default () => {
  const [plan, setPlan] = useState("");

  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    // TODO: fetch the current plan from Cognito

    getSession().then((data) => {
      if (data["custom:plan"]) setPlan(data["custom:plan"]);
    });
  }, [getSession]);

  const onSubmit = (event) => {
    event.preventDefault();

    getSession().then(({ user }) => {
      const attributes = [
        new CognitoUserAttribute({
          Name: "custom:plan",
          Value: plan,
        }),
      ];

      user.updateAttributes(attributes, (err, result) => {
        if (err) console.error(err);

        console.log(result);
      });
    });
  };

  return (
    <div>
      <h1>Update your plan</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="plan"
          value={plan}
          onChange={(event) => setPlan(event.target.value)}
        />
        <button type="submit">Update Plan</button>
      </form>
    </div>
  );
};

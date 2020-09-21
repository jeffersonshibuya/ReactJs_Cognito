import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-east-1_WFSuDoYK8",
  ClientId: "63falk9jsn4rvv2uqtm5dfieqd",
};

export default new CognitoUserPool(poolData);

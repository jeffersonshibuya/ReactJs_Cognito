import React from "react";
import { Account } from "./components/Accounts";
import Attributes from "./components/Attributes";
import ForgotPassword from "./components/ForgotPassword";
import Login from "./components/Login";
import Settings from "./components/Settings";
import Signup from "./components/Signup";
import Status from "./components/Status";

function App() {
  return (
    <Account>
      <Status />
      <Signup />
      <Login />
      <ForgotPassword />
      <Settings />

      <Attributes />
    </Account>
  );
}

export default App;

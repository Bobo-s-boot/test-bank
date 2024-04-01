import React from "react";
import Page from "./component/page";
import Home from "./container/home";
import SignIn from "./container/signin";
import Recovery from "./container/recovery";
import RecoveryConfirm from "./container/recovery-confirm";
import SignUp from "./container/signup";
import SignupConfirm from "./container/signup-confirm";
import Balance from "./container/balance";
import Settings from "./container/settings";
import Notic from "./container/notic";
import Recive from "./container/recive";
import Send from "./container/send";
import Check from "./container/check";
import CheckSending from "./container/check-sending";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Page>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/recovery-confirm" element={<RecoveryConfirm />} />
          <Route path="/balance" element={<Balance />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notic" element={<Notic />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signup-confirm" element={<SignupConfirm />} />
          <Route path="/recive" element={<Recive />} />
          <Route path="/send" element={<Send />} />
          <Route path="/check/:transactionId" element={<Check />} />
          <Route path="/check-sending/:sendingId" element={<CheckSending />} />
        </Routes>
      </Page>
    </BrowserRouter>
  );
}

export default App;

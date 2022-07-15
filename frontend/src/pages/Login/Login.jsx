import React from "react";
import ConnectModal from "../../components/LoginComponents/ConnectModal/ConnectModal";
import Header from "../../components/Header/Header";

const Login = () => {
  return (
    <>
      <header>
        <Header />
      </header>
      <main>
        <ConnectModal />
      </main>
    </>
  );
};

export default Login;

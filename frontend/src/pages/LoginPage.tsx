import React from "react";
import CustomCard from "../components/CustomCard";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <>
      <CustomCard
        title="Login"
        subtitle="Welcome back! Please login to your account."
        body={<LoginForm />}
        cardWidth="md"
      />
    </>
  );
};

export default LoginPage;

import React from "react";
import CustomCard from "../components/CustomCard";
import RegisterForm from "../components/RegisterForm";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const RegisterPage = () => {
  return (
    <>
      <CustomCard
        title="Sign Up"
        subtitle="Welcome to the community! We just need to get few details from you."
        body={<RegisterForm />}
        cardWidth="md"
        titleIcon={<LockOutlinedIcon />}
      />
    </>
  );
};

export default RegisterPage;

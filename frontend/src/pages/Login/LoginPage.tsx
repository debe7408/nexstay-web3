import CustomCard from "../../components/CustomCard";
import LoginForm from "../../components/LoginForm";

/**
 * Depricated, use web3Auth instead to login
 */
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

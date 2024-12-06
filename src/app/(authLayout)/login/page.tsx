import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

const LoginPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;

import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "../utils/manageSession";
import LoginForm from "../components/LoginForm";

const LoginPage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    const user = getSession("user");
    if (user) {
      if (user.role === "admin") {
        router.push("/clients");
      } else if (user.role === "user") {
        router.push("/routine");
      }
    }
  }, [router]);

  return (
    <div>
      <h6> Bienvenido! </h6>
      <LoginForm />
    </div>
  );
};

export default LoginPage;

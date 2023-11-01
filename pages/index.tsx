import { useEffect } from "react";
import { useRouter } from "next/router";

const HomePage: React.FC = () => {
  const router = useRouter();

  useEffect(() => {
    // Always redirect to the login page from the home page
    router.push("/login");
  }, [router]);

  return null;
};

export default HomePage;

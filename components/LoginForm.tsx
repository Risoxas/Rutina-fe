import React, { useRef } from "react";
import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";
import { login } from "../services/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginForm: React.FC = () => {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { setUser } = useUser();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (email && password) {
      login(email, password)
        .then((res) => {
          const { token, role, email } = res;
          setUser({ token, role, email });

          router.push("/clients");
        })
        .catch((err) => {
          console.error(err);
          toast.error("Error al iniciar sesión");
        });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email{" "}
        <input
          autoComplete="username"
          type="email"
          ref={emailRef}
          placeholder="Email"
          name="email"
        />
      </label>

      <label>
        Password{" "}
        <input
          autoComplete="current-password"
          type="password"
          ref={passwordRef}
          placeholder="Password"
          name="password"
        />
      </label>
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;

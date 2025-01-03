import { useRef } from "react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-lg border min-w-48 p-5 flex flex-col gap-4">
        <Input type="text" placeholder="Username" reference={usernameRef} />
        <Input type="password" placeholder="Password" reference={passwordRef} />
        <div className="flex justify-center pt-5 ">
          <Button
            variant="primary"
            size="md"
            text="Sign In"
            onClick={async () => {
              const username = usernameRef.current?.value;
              const password = passwordRef.current?.value;
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/auth/signin`,
                {
                  username,
                  password,
                }
              );
              const jwt = response.data.token;
              localStorage.setItem("token", jwt);
              navigate("/dashboard");
            }}
            fullWidth={true}
          />
        </div>
      </div>
    </div>
  );
};
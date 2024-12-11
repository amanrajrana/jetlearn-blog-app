import AuthForm from "@/components/auth-form";
import authService from "@/services/auth.services";
import { Alert, AlertDescription } from "@ui/alert";
import SubmitButton from "@ui/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui/card";
import { AlertCircle, CircleCheck } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { setCookie } from "@/utils/cookie";

type Message = {
  type: "success" | "destructive";
  message: string;
} | null;

export default function Signup() {
  const navigate = useNavigate();
  
  const [message, setMessage] = useState<Message>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const onSubmit = async () => {
    setMessage(null);

    if (!username || !password) {
      setMessage({
        type: "destructive",
        message: "Fill all filed!",
      });
      return;
    }

    setLoading(true);

    try {
      const res = await authService.register(username, password);
      setCookie("token", res.token);
      setMessage({ type: "success", message: "Account created successfully!" });
      navigate("/dashboard");
    } catch (error: unknown) {
      setMessage({ type: "destructive", message: (error as Error).message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="h-svh flex justify-center items-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>Join community! Create an account.</CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert className="mb-4" variant={message.type}>
              {message.type === "success" ? (
                <CircleCheck size={16} />
              ) : (
                <AlertCircle size={16} />
              )}
              <div>
                <AlertDescription>{message.message}</AlertDescription>
              </div>
            </Alert>
          )}
          <AuthForm
            username={username}
            password={password}
            setUsername={setUsername}
            setPassword={setPassword}
          />
        </CardContent>
        <CardFooter>
          <SubmitButton onClick={onSubmit} loading={loading} className="w-full">
            Register
          </SubmitButton>
        </CardFooter>
        <div></div>
        <CardFooter>
          Already Register?
          <Link className="text-primary font-semibold ml-2" to="/login">
            Login
          </Link>
        </CardFooter>
      </Card>
    </main>
  );
}

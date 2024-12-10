import { Checkbox } from "@ui/checkbox";
import { Input } from "@ui/input";
import { Label } from "@ui/label";
import React, { useState } from "react";

interface Props {
  username: string;
  password: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

export default function AuthForm({
  username,
  password,
  setUsername,
  setPassword,
}: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  return (
    <form>
      <div className="grid w-full items-center gap-4">
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="email"
            placeholder="name@exmaple.com"
          />
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="flex items-center gap-x-1">
            <Checkbox
              checked={showPassword}
              onClick={() => setShowPassword(!showPassword)}
              id="showPassword"
            />
            <label htmlFor="showPassword">show password</label>
          </div>
        </div>
      </div>
    </form>
  );
}
